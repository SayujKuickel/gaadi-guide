import fs from "fs";
import stops from "../data/stops_data.json" assert { type: "json" };
import routes from "../data/route_data.json" assert { type: "json" };

// Manual input
const fromStopId = "226ba49e";
const toStopId = "1dc88f2";

// Build graph
const graph = new Map<string, Set<string>>();
for (const route of routes) {
  for (let i = 0; i < route.stops.length - 1; i++) {
    const from = route.stops[i];
    const to = route.stops[i + 1];

    if (!graph.has(from)) graph.set(from, new Set());
    if (!graph.has(to)) graph.set(to, new Set());

    graph.get(from)!.add(to);
    graph.get(to)!.add(from); // bidirectional
  }
}

// BFS to find shortest path
function bfs(from: string, to: string): string[] | null {
  const queue: string[][] = [[from]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const path = queue.shift()!;
    const last = path[path.length - 1];

    if (last === to) return path;
    if (visited.has(last)) continue;

    visited.add(last);
    const neighbors = graph.get(last);
    if (!neighbors) continue;

    for (const neighbor of neighbors) {
      queue.push([...path, neighbor]);
    }
  }

  return null;
}

const pathIds = bfs(fromStopId, toStopId);
if (!pathIds) {
  console.error("No path found.");
  process.exit(1);
}

const pathStops = pathIds.map((id) => stops.find((s) => s.id === id)!);

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Dynamic Path Visualization</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>body, html, #map { height: 100%; margin: 0; }</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const stops = ${JSON.stringify(stops)};
    const routes = ${JSON.stringify(routes)};

    const map = L.map('map').setView([27.7, 85.3], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let fromStop = null;
    let toStop = null;
    let pathLine = null;

    // Build graph
    const graph = new Map();
    routes.forEach(route => {
      for (let i = 0; i < route.stops.length - 1; i++) {
        const from = route.stops[i];
        const to = route.stops[i + 1];
        if (!graph.has(from)) graph.set(from, new Set());
        if (!graph.has(to)) graph.set(to, new Set());
        graph.get(from).add(to);
        graph.get(to).add(from);
      }
    });

    function bfs(from, to) {
      const queue = [[from]];
      const visited = new Set();

      while (queue.length > 0) {
        const path = queue.shift();
        const last = path[path.length - 1];

        if (last === to) return path;
        if (visited.has(last)) continue;
        visited.add(last);

        (graph.get(last) || []).forEach(neighbor => {
          queue.push([...path, neighbor]);
        });
      }
      return null;
    }

    function getStopById(id) {
      return stops.find(s => s.id === id);
    }

    function drawPath(pathIds) {
      if (pathLine) map.removeLayer(pathLine);
      const latlngs = pathIds.map(id => {
        const s = getStopById(id);
        return [s.lat, s.lng];
      });
      pathLine = L.polyline(latlngs, {
        color: 'orange',
        weight: 5
      }).addTo(map);
    }

    stops.forEach(stop => {
      L.circleMarker([stop.lat, stop.lng], {
        radius: 5,
        color: 'black',
        fillColor: 'white',
        fillOpacity: 1
      })
      .addTo(map)
      .bindPopup(stop.name || stop.id)
      .on('click', function () {
        if (!fromStop) {
          fromStop = stop;
          this.setStyle({ color: 'blue', fillColor: 'blue' });
        } else if (!toStop && stop.id !== fromStop.id) {
          toStop = stop;
          this.setStyle({ color: 'red', fillColor: 'red' });

          const path = bfs(fromStop.id, toStop.id);
          if (path) drawPath(path);
          else alert("No path found.");
        } else {
          alert("Refresh to start over.");
        }
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync("path_visual.html", html);
console.log("✅ Generated path_visual.html");
