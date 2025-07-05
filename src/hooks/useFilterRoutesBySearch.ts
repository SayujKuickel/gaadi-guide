import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// types
import { type IRoute } from "@/types/route.types";
import { type IStopOption } from "@/types/stopOptions.types";
//
import BusStops from "@/data/stops_data.json";
import routeData from "@/data/route_data.json";
//
import type { IStop } from "@/types/stop.types";

const useFilterRoutesBySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStop, setSelectedStop] = useState<IStopOption | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[] | null>(
    routeData
  );
  const [showResults, setShowResults] = useState(false);

  function handleSearch(stopId: string) {
    const filtered = routeData.filter((route) => route.stops.includes(stopId));
    setFilteredRoutes(filtered);
  }

  function handleSetSelectedStop(stop: IStopOption) {
    if (!stop.id || !stop) return;

    setSelectedStop(stop);
    setSearchParams({
      stop: stop.id,
    });
    setShowResults(true);
  }

  useEffect(() => {
    const stopId = searchParams.get("stop");

    if (stopId) {
      const selStop = BusStops.find((el: IStop) => el.id === stopId);
      if (selStop) {
        setSelectedStop({ id: selStop.id, name: selStop.name });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (!selectedStop) return;
    handleSearch(selectedStop?.id);
  }, [selectedStop]);

  return {
    selectedStop,
    setSelectedStop,
    handleSetSelectedStop,
    filteredRoutes,
    showResults,
    setShowResults,
  };
};

export default useFilterRoutesBySearch;
