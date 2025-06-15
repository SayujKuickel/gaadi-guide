export const DEFAULT_MAP_TILE = "carto-light";

export interface mapLayer {
  id: string;
  name: string;
  mapTypeLabel: string;
  url: string;
  attribution: string;
  icon: string;
}

export const tileLayerOptions: Record<string, mapLayer> = {
  openstreetmap: {
    id: "openstreetmap",
    name: "Openstreetmap",
    mapTypeLabel: "Detailed",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://project-osrm.org/">OSRM</a> | ♡ <a href="https://sayuj.com.np">Sayuj Kuickel</a>`,
    icon: "/tiles/openstreetmap.jpg",
  },
  "carto-light": {
    id: "carto-light",
    name: "Carto Light",
    mapTypeLabel: "Light Minimal",
    attribution: `&copy; <a href="https://carto.com/attributions">CARTO</a> | <a href="https://project-osrm.org/">OSRM</a> | ♡ <a href="https://sayuj.com.np">Sayuj Kuickel</a>`,
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    icon: "/tiles/carto-light.jpg",
  },
  "carto-dark": {
    id: "carto-dark",
    name: "Carto Dark",
    mapTypeLabel: "Dark Minimal",
    attribution: `&copy; <a href="https://carto.com/attributions">CARTO</a> | <a href="https://project-osrm.org/">OSRM</a> | ♡ <a href="https://sayuj.com.np">Sayuj Kuickel</a>`,
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    icon: "/tiles/carto-dark.jpg",
  },
};
