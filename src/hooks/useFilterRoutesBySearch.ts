import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// \types
import { type IRoute } from "@/types/route.types";
import { type IStopOption } from "@/types/stopOptions.types";
import type { IStop } from "@/types/stop.types";
//\ data
import stops_data from "@/data/stops_data.json";
import route_data from "@/data/route_data.json";

const useFilterRoutesBySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStop, setSelectedStop] = useState<IStopOption | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[] | null>(
    route_data
  );
  const [showResults, setShowResults] = useState(false);

  function handleSearch(stopId: string) {
    const filtered = route_data.filter((route) => route.stops.includes(stopId));
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
      const selStop = stops_data.find((el: IStop) => el.id === stopId);
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
