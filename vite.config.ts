import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("leaflet") && !id.includes("react-leaflet"))
              return "leaflet";
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-leaflet")
            ) {
              return "react-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
