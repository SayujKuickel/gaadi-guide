import { useEffect, useState } from "react";
// types
import { type IRoute } from "@/types/route.types";
import { type IStopOption } from "@/types/stopOptions.types";
//
import routeData from "@/data/route_data.json";

const useFilterRoutesBySearch = () => {
  const [selectedStop, setSelectedStop] = useState<IStopOption | null>(null);
  const [filteredRoutes, setFilteredRoutes] = useState<IRoute[] | null>(
    routeData
  );

  function handleSearch(stopId: string) {
    const filtered = routeData.filter((route) => route.stops.includes(stopId));

    setFilteredRoutes(filtered);
  }

  useEffect(() => {
    if (!selectedStop) return;

    handleSearch(selectedStop?.id);
  }, [selectedStop]);

  return { selectedStop, setSelectedStop, filteredRoutes };
};

export default useFilterRoutesBySearch;
