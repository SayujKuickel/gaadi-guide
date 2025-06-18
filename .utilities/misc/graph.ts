// index.ts
import fs from "fs";
import stopsData from "./updated_stops_data.json" assert { type: "json" };
import routeData from "./updated_route_data.json" assert { type: "json" };

const graph = new Map<string, Set<string>>();

// Build graph
for (const route of routeData) {
  for (let i = 0; i < route.stops.length - 1; i++) {
    const from = route.stops[i];
    const to = route.stops[i + 1];

    if (!graph.has(from)) graph.set(from, new Set());
    if (!graph.has(to)) graph.set(to, new Set());

    graph.get(from)!.add(to);
    graph.get(to)!.add(from);
  }
}

// Convert graph edges to line segments
const edges = new Set<string>();
const lines: [number, number][][] = [];

for (const [fromId, neighbors] of graph.entries()) {
  const fromStop = stopsData.find((s) => s.id === fromId);
  if (!fromStop) continue;

  for (const toId of neighbors) {
    const toStop = stopsData.find((s) => s.id === toId);
    if (!toStop) continue;

    const key = [fromId, toId].sort().join("-");
    if (edges.has(key)) continue;
    edges.add(key);

    lines.push([
      [fromStop.lat, fromStop.lng],
      [toStop.lat, toStop.lng],
    ]);
  }
}

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Stop Graph</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>#map { height: 100vh; }</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([27.7, 85.3], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Stops
    const stops = ${JSON.stringify(stopsData)};
    stops.forEach(stop => {
      L.circleMarker([stop.lat, stop.lng], {
        radius: 5,
        color: 'green',
        fillColor: 'green',
        fillOpacity: 0.8,
      }).addTo(map).bindPopup(stop.name);
    });

    // Graph edges
    const lines = ${JSON.stringify(lines)};
    lines.forEach(line => {
      L.polyline(line, { color: 'red', weight: 2 }).addTo(map);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync("graph.html", html);
