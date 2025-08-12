const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const routeFilePath = path.join(__dirname, "route.json");

const cleanedRoutePath = path.join(__dirname, "/export/", "route_cleaned.json");
const cleanedStopsPath = path.join(
  __dirname,
  "/export/",
  "stops_data_cleaned.json"
);

fs.readFile(routeFilePath, "utf-8", (err, routeRaw) => {
  if (err) {
    console.error("Error reading route file:", err.message);
    console.info(`Needs a route.json file 
  This file can be generated via the https://gaadiguide.sayuj.com.np/add-route
  just paste the downloaded content in the route.json file in the same directory 
  as this file`);
    return;
  }

  try {
    const routeData = JSON.parse(routeRaw);

    const idMap = {};
    const cleanedStops = [];

    const cleanedStopIds = routeData.stops.map((stop) => {
      if (stop.id.startsWith("new-")) {
        const newId = crypto.randomBytes(5).toString("hex");
        idMap[stop.id] = newId;

        cleanedStops.push({
          ...stop,
          id: newId,
        });

        return newId;
      } else {
        return stop.id;
      }
    });

    const startStopId = cleanedStopIds[0];
    const endStopId = cleanedStopIds[cleanedStopIds.length - 1];
    const newRouteId = `${startStopId}-to-${endStopId}`;

    const cleanedRoute = {
      id: newRouteId,
      name: routeData.routeName,
      lineColor: routeData.routeColor,
      stops: cleanedStopIds,
    };

    fs.writeFile(
      cleanedRoutePath,
      JSON.stringify(cleanedRoute, null, 2),
      (err) => {
        if (err) {
          console.error("Error while creating routes file", err.message);
        } else {
          console.log("Created cleaned Route data");
        }
      }
    );

    fs.writeFile(
      cleanedStopsPath,
      JSON.stringify(cleanedStops, null, 2),
      (err) => {
        if (err) {
          console.error("Error while creating stops file", err.message);
        } else {
          console.log("Created cleaned stops data");
        }
      }
    );
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr.message);
  }
});
