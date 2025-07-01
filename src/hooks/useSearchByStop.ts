import type { IStopOption } from "@/types/stopOptions.types";
import { useCallback, useEffect, useState } from "react";
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

  const findStopById = useCallback((id: string): IStopOption | null => {
    const stop = stopsData.find((stop) => stop.id === id);
    return stop ? { id: stop.id, name: stop.name } : null;
  }, []);

  const validateStops = useCallback(
    (start: IStopOption, destination: IStopOption): boolean => {
      if (start.id === destination.id) {
        showToast("Start and destination cannot be the same", "error");
        return false;
      }
      return true;
    },
    [showToast]
  );

  const updateSearchParams = useCallback(
    (startStop: IStopOption, destinationStop: IStopOption) => {
      if (!validateStops(startStop, destinationStop)) return;

      const currentStopId = searchParams.get("stop") || "";
      setSearchParams({
        from: startStop.id,
        to: destinationStop.id,
        stop: currentStopId,
      });
    },
    [searchParams, setSearchParams, validateStops]
  );

  useEffect(() => {
    const fromId = searchParams.get("from");
    const toId = searchParams.get("to");

    if (fromId) {
      const startStop = findStopById(fromId);
      if (startStop) setSelectedStartStop(startStop);
    }

    if (toId) {
      const destinationStop = findStopById(toId);
      if (destinationStop) setSelectedDestinationStop(destinationStop);
    }
  }, [searchParams, findStopById]);

  useEffect(() => {
    if (selectedStartStop && selectedDestinationStop) {
      updateSearchParams(selectedStartStop, selectedDestinationStop);
    }
  }, [selectedStartStop, selectedDestinationStop, updateSearchParams]);

  const handleSearchByStop = useCallback(async () => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (!from?.trim() || !to?.trim()) {
      showToast("Please select both start and destination stops", "error");
      return;
    }

    setIsSearchingForStops(true);

    try {
      const segments = await searchRouteSegments(from, to);

      if (segments.error) {
        showToast(
          `${segments.error}\n(Search is currently being developed. There may be errors!)`,
          "error"
        );
      } else {
        setSearchParams({
          from,
          to,
          stop: from,
        });
      }

      return segments;
    } catch (error) {
      showToast("An unexpected error occurred during search", "error");
      console.error("Search error:", error);
    } finally {
      setIsSearchingForStops(false);
    }
  }, [searchParams, setSearchParams, showToast]);

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
