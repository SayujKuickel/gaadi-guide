const fs = require("fs");
const path = require("path");

const baseUrl = "https://bus-routes.sayuj.com.np";
const staticRoutes = [
  "",
  "routes",
  "stops",
  "search",
  "contact",
  "about",
  "bus",
  "operators",
];

const routeData = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../src/data/route_data.json"),
    "utf-8"
  )
);

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

staticRoutes.forEach((route) => {
  xml += `  <url>\n    <loc>${baseUrl}/${route}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

routeData.forEach((route) => {
  xml += `  <url>\n    <loc>${baseUrl}/bus/${route.id}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
});

let operators = [...new Set(routeData.map((route) => route?.operator))].filter(
  (op) => op
);

operators.forEach((operator) => {
  xml += `  <url>\n    <loc>${baseUrl}/operators/${operator
    .replace(" ", "-")
    .toLowerCase()}</loc>\n    <priority>0.6</priority>\n  </url>\n`;
});

xml += `</urlset>`;

const outputPath = path.join(__dirname, "../public", "sitemap.xml");
fs.writeFileSync(outputPath, xml, "utf-8");

console.log("Generated sitemap!");
