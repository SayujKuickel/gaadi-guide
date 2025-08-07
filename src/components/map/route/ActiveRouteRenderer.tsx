import type { IRoute } from "@/types/route.types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Route_data from "@/data/route_data.json";
import RouteRenderer from "./RouteRenderer";

interface ActiveRouteRendererProps {
  fitRouteToWindow?: boolean;
}

const ActiveRouteRenderer: React.FC<ActiveRouteRendererProps> = ({
  fitRouteToWindow,
}) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState<IRoute | null>(null);

  useEffect(() => {
    const routekey = searchParams.get("route");

    if (!routekey) {
      setRouteData(null);
      return;
    }

    const route = Route_data.find((rt) => rt.id === routekey);

    if (!route) {
      console.warn("Invalid Route Id found in the url");
      setRouteData(null);
      return;
    }

    setRouteData(route);
  }, [searchParams]);

  if (!routeData) return null;

  return (
    <RouteRenderer
      stopIds={routeData?.stops}
      fitToScreen={fitRouteToWindow}
      lineColor={routeData?.lineColor}
    />
  );
};

export default ActiveRouteRenderer;
