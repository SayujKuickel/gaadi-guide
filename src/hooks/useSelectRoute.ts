import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// \data
import route_data from "@/data/route_data.json";
import stops_data from "@/data/stops_data.json";
// \types
import type { IRouteOption } from "@/types/routeOptions.types";
import type { IStopOption } from "@/types/stopOptions.types";
import type { IStop } from "@/types/stop.types";

const useRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoute, setSelectedRoute] = useState<IRouteOption | null>(null);
  const [selectedStop, setSelectedStop] = useState<IStopOption | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const routeId = searchParams.get("route");
    const stopId = searchParams.get("stop");

    if (routeId) {
      const selRoute = route_data.find((el) => el.id === routeId);

      if (selRoute) {
        setSelectedRoute({ id: selRoute.id, name: selRoute.name });
      }
    }

    if (stopId) {
      const selStop = stops_data.find((el: IStop) => el.id === stopId);

      if (selStop) {
        setSelectedStop({ id: selStop.id, name: selStop.name });
      }
    }
  }, [searchParams]);

  function handleRouteSelect(route: IRouteOption) {
    if (route.id === selectedRoute?.id) return;

    setSelectedRoute(route);
    setSelectedStop(null);
    setSearchParams({ route: route.id });
    setShowResults(true);
  }

  function handleStopSelect(stop: IStopOption) {
    if (!selectedRoute || stop.id === selectedStop?.id) return;

    setSelectedStop(stop);
    setSearchParams({ route: selectedRoute?.id, stop: stop.id });
  }

  return {
    selectedRoute,
    handleRouteSelect,
    selectedStop,
    handleStopSelect,
    showResults,
    setShowResults,
  };
};

export default useRoute;
