import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// \data
import BusRoutes from "@/data/route_data.json";
import BusStops from "@/data/stops_data.json";
// \types
import type { IRouteOption } from "@/types/routeOptions.types";
import type { IStopOption } from "@/types/stopOptions.types";
import type { IStop } from "@/types/stop.types";

const useRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedRoute, setSelectedRoute] = useState<IRouteOption | null>(null);
  const [selectedStop, setSelectedStop] = useState<IStopOption | null>(null);

  useEffect(() => {
    const routeId = searchParams.get("route");
    const stopId = searchParams.get("stop");

    if (routeId) {
      const selRoute = BusRoutes.find((el) => el.id === routeId);

      if (selRoute) {
        setSelectedRoute({ id: selRoute.id, name: selRoute.name });
      }
    }

    if (stopId) {
      const selStop = BusStops.find((el: IStop) => el.id === stopId);

      if (selStop) {
        setSelectedStop({ id: selStop.id, name: selStop.name });
      }
    }
  }, [searchParams]);

  function handleRouteSelect(route: IRouteOption) {
    if (route.id === selectedRoute?.id) return;

    setSelectedRoute(route);
    setSelectedStop(null);
    navigate(`/?route=${route.id}`);
  }

  function handleStopSelect(stop: IStopOption) {
    if (stop.id === selectedStop?.id) return;

    setSelectedStop(stop);
    navigate(`/?route=${selectedRoute?.id}&stop=${stop.id}`);
  }

  return { selectedRoute, handleRouteSelect, selectedStop, handleStopSelect };
};

export default useRoute;
