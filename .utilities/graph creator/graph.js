// graph creator/graph.js
const fs = require("fs");
const path = require("path");
const routes = require("./route_data.json");

function buildGraph(routes) {
  const graph = {};

  // Initialize nodes
  routes.forEach((route) => {
    route.stops.forEach((stop) => {
      if (!graph[stop]) graph[stop] = [];
    });
  });

  // Add edges for consecutive stops
  routes.forEach((route) => {
    for (let i = 0; i < route.stops.length - 1; i++) {
      const fromStop = route.stops[i];
      const toStop = route.stops[i + 1];
      graph[fromStop].push({ stop: toStop, routeId: route.id });
      graph[toStop].push({ stop: fromStop, routeId: route.id }); // Bidirectional
    }
  });

  // Add transfer edges
  Object.keys(graph).forEach((stop) => {
    const routesWithStop = routes.filter((route) => route.stops.includes(stop));
    for (let i = 0; i < routesWithStop.length; i++) {
      for (let j = i + 1; j < routesWithStop.length; j++) {
        graph[stop].push({
          stop,
          routeId: routesWithStop[j].id,
          isTransfer: true,
        });
      }
    }
  });

  return graph;
}

// Ensure public directory exists
const outputDir = path.join(process.cwd(), "public");
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }

  // Generate and save graph
  const graph = buildGraph(routes);
  console.log(`Graph contains ${Object.keys(graph).length} stops`);
  const outputPath = path.join(outputDir, "graph.json");
  fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2), "utf-8");

  // Verify file was created
  if (fs.existsSync(outputPath)) {
    console.log(`Graph successfully saved to ${outputPath}`);
  } else {
    console.error(`Failed to verify ${outputPath} was created`);
  }
} catch (error) {
  console.error("Error generating graph:", error.message);
  process.exit(1);
}
