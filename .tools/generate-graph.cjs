const fs = require("fs");
const path = require("path");

const routes = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../src/data/route_data.json"),
    "utf-8"
  )
);

function buildGraph(routes) {
  const graph = {};

  routes.forEach((route) => {
    route.stops.forEach((stop) => {
      if (!graph[stop]) graph[stop] = [];
    });
  });

  routes.forEach((route) => {
    for (let i = 0; i < route.stops.length - 1; i++) {
      const fromStop = route.stops[i];
      const toStop = route.stops[i + 1];
      graph[fromStop].push({ stop: toStop, routeId: route.id });
      graph[toStop].push({ stop: fromStop, routeId: route.id });
    }
  });

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

const outputDir = path.join(process.cwd(), "src/data");
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created directory: ${outputDir}`);
  }

  const graph = buildGraph(routes);
  console.log(`Graph contains ${Object.keys(graph).length} stops`);
  const outputPath = path.join(outputDir, "graph.json");
  fs.writeFileSync(outputPath, JSON.stringify(graph, null, 2), "utf-8");

  if (fs.existsSync(outputPath)) {
    console.log(`Graph successfully saved to ${outputPath}`);
  } else {
    console.error(`Failed to verify ${outputPath} was created`);
  }
} catch (error) {
  console.error("Error generating graph:", error.message);
  process.exit(1);
}
