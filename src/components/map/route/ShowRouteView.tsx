import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RouteData from "@/data/route_data.json";
import type { IRoute } from "@/types/route.types";
import Button from "@/components/common/Button";
import BusLineTitle from "@/components/bus/BusLineTitle";
import BusStops from "@/components/bus/BusStops/BusStops";
import RouteView from "./RouteView";

interface ShowRouteViewProps {}

const ShowRouteView: React.FC<ShowRouteViewProps> = () => {
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

  if (!routeData) return null;

  return (
    <RouteView
      stopIds={routeData?.stops}
      fitToScreen={true}
      lineColor={routeData?.lineColor}
    />
  );
};

export default ShowRouteView;
