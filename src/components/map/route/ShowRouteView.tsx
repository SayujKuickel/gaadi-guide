import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RouteData from "@/data/route_data.json";
import type { IRoute } from "@/types/route.types";
import RouteView from "./RouteView";
import BusStopView from "../stop/BusStopView";
import ShowAllStops from "../stop/ShowAllStops";

interface ShowRouteViewProps {
  fitRouteToWindow?: boolean;
}

const ShowRouteView: React.FC<ShowRouteViewProps> = ({ fitRouteToWindow }) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState<IRoute | null>(null);

  useEffect(() => {
    const routekey = searchParams.get("route");

    if (!routekey) {
      console.warn("No route selected.");
      setRouteData(null);
      return;
    }

    const route = RouteData.find((rt) => rt.id === routekey);

    if (!route) {
      console.warn("Route not found.");
      setRouteData(null);
      return;
    }

    setRouteData(route);
  }, [searchParams]);

  // if (!routeData) return <ShowAllStops />;
  if (!routeData) return null;

  return (
    <RouteView
      stopIds={routeData?.stops}
      fitToScreen={fitRouteToWindow}
      lineColor={routeData?.lineColor}
    />
  );
};

export default ShowRouteView;
