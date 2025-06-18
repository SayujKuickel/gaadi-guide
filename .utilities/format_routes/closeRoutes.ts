import fs from "fs";
import stopsData from "../stops_data.json" assert { type: "json" };
import routeData from "../route_data.json" assert { type: "json" };

const graph = new Map<string, Set<string>>();

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

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const closeThreshold = 75;
const closePairs: { from: string; to: string; distance: number }[] = [];

for (let i = 0; i < stopsData.length; i++) {
  for (let j = i + 1; j < stopsData.length; j++) {
    const s1 = stopsData[i];
    const s2 = stopsData[j];

    const dist = haversineDistance(s1.lat, s1.lng, s2.lat, s2.lng);
    if (dist < closeThreshold) {
      closePairs.push({ from: s1.id, to: s2.id, distance: Math.round(dist) });
    }
  }
}

fs.writeFileSync("close_stops.json", JSON.stringify(closePairs, null, 2));
console.log(`Found ${closePairs.length} close stop pairs.`);

const closeStopsHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Close Stops Visualization</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <style>#map { height: 100vh; }</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([27.7, 85.3], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const stops = ${JSON.stringify(stopsData)};
    const closePairs = ${JSON.stringify(closePairs)};

    
    const closeStopIds = new Set();
    closePairs.forEach(pair => {
      closeStopIds.add(pair.from);
      closeStopIds.add(pair.to);
    });

    stops.forEach(stop => {
      if (closeStopIds.has(stop.id)) {
        L.circleMarker([stop.lat, stop.lng], {
          radius: 6,
          color: 'green',
          fillColor: 'lime',
          fillOpacity: 0.9,
        }).addTo(map).bindPopup(stop.name);
      }
    });

    
    closePairs.forEach(pair => {
      const fromStop = stops.find(s => s.id === pair.from);
      const toStop = stops.find(s => s.id === pair.to);
      if (fromStop && toStop) {
        L.polyline([[fromStop.lat, fromStop.lng], [toStop.lat, toStop.lng]], {
          color: 'orange',
          weight: 3,
          dashArray: '4',
        }).addTo(map).bindPopup(\`Distance: \${pair.distance} m\`);
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync("close_stops.html", closeStopsHtml);
