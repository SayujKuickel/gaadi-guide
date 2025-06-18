import fs from "fs";
import stopsData from "../stops_data.json" assert { type: "json" };
import routeData from "../route_data.json" assert { type: "json" };
import close_stops from "../close_stops.json" assert { type: "json" };

// Create a lookup map from 'from' to 'to'
const replacementMap = new Map(close_stops.map(({ from, to }) => [from, to]));

// Replace stops in routeData
const updatedRoutes = routeData.map((route) => {
  const newStops = route.stops.map((stopId) => {
    return replacementMap.get(stopId) ?? stopId;
  });
  return { ...route, stops: newStops };
});

const fromIdsSet = new Set(close_stops.map((pair) => pair.from));

const updatedStops = stopsData.filter((stop) => !fromIdsSet.has(stop.id));

// Write updated data back to files
fs.writeFileSync(
  "updated_route_data.json",
  JSON.stringify(updatedRoutes, null, 2)
);
fs.writeFileSync(
  "updated_stops_data.json",
  JSON.stringify(updatedStops, null, 2)
);

console.log(`Removed ${fromIdsSet.size} stops from stopsData.`);
console.log("Updated stops and routes saved.");
