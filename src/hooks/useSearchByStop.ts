import type { IStopOption } from "@/types/stopOptions.types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import stopsData from "@/data/stops_data.json";
import { useToast } from "@/context/ToastContext";
import searchRouteSegments from "@/utils/searchRouteSegments";

const useSearchByStop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();

  const [selectedStartStop, setSelectedStartStop] =
    useState<IStopOption | null>(null);
  const [selectedDestinationStop, setSelectedDestinationStop] =
    useState<IStopOption | null>(null);
  const [isSearchingForStops, setIsSearchingForStops] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedStartStop && selectedDestinationStop) {
      if (selectedStartStop.id === selectedDestinationStop.id) {
        showToast("Start and destination cannot be the same", "error");
        return;
      }

      setSearchParams({
        from: selectedStartStop.id,
        to: selectedDestinationStop.id,
      });
    }
  }, [selectedStartStop, selectedDestinationStop, setSearchParams]);

  useEffect(() => {
    const fromId = searchParams.get("from");
    const toId = searchParams.get("to");

    if (fromId) {
      const foundFrom = stopsData.find((stop) => stop.id === fromId);
      if (foundFrom)
        setSelectedStartStop({ id: foundFrom.id, name: foundFrom.name });
    }

    if (toId) {
      const foundTo = stopsData.find((stop) => stop.id === toId);
      if (foundTo)
        setSelectedDestinationStop({ id: foundTo.id, name: foundTo.name });
    }
  }, [searchParams]);

  const handleSearchByStop = async () => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from?.trim() || !to?.trim()) {
      showToast("Please Enter Both Start and Destination stops!", "error");
      return;
    }

    setIsSearchingForStops(true);

    // showToast(`The search feature is being implemented!`, "information");
    const segments = await searchRouteSegments(from, to);

    if (segments.error) {
      showToast(
        `${segments.error}\n (Search is currently being developed. There may be errors!)`,
        "error"
      );
    }

    setIsSearchingForStops(false);
    return segments;
  };

  return {
    selectedStartStop,
    selectedDestinationStop,
    setSelectedStartStop,
    setSelectedDestinationStop,
    handleSearchByStop,
    isSearchingForStops,
  };
};

export default useSearchByStop;
