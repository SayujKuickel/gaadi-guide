import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <SpeedInsights />
  </>
);
