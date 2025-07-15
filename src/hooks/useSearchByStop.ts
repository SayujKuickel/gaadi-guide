import type { IStopOption } from "@/types/stopOptions.types";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import stops_data from "@/data/stops_data.json";
import { useToast } from "@/context/ToastContext";
import searchRouteSegments from "@/utils/searchRouteSegments";
import { useUserLocation } from "./useUserLocation";

const useSearchByStop = () => {
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { userLocation, getUserLocation } = useUserLocation();

  const [selectedStartStop, setSelectedStartStop] =
    useState<IStopOption | null>(null);
  const [selectedDestinationStop, setSelectedDestinationStop] =
    useState<IStopOption | null>(null);
  const [isSearchingForStops, setIsSearchingForStops] = useState(false);

  const findStopById = useCallback((id: string): IStopOption | null => {
    const stop = stops_data.find((stop) => stop.id === id);
    return stop ? { id: stop.id, name: stop.name } : null;
  }, []);

  const validateStops = useCallback(
    (start: IStopOption, destination: IStopOption) => {
      if (start.id === destination.id) {
        showToast("Start and destination cannot be the same", "error");
        return false;
      }
      return true;
    },
    [showToast]
  );

  const getClosestStop = useCallback(
    (lat: number, lng: number): IStopOption | null => {
      let minDist = Infinity;
      let closest: IStopOption | null = null;

      for (const stop of stops_data) {
        const dx = stop.lng - lng;
        const dy = stop.lat - lat;
        const dist = dx * dx + dy * dy;

        if (dist < minDist) {
          minDist = dist;
          closest = { id: stop.id, name: stop.name };
        }
      }

      return closest;
    },
    []
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const fromId = params.get("from");
    const toId = params.get("to");

    if (fromId) {
      const frmStop = findStopById(fromId);
      if (frmStop) setSelectedStartStop(frmStop);
    }

    if (toId) {
      const toStop = findStopById(toId);

      if (toStop) setSelectedDestinationStop(toStop);
    }
  }, [searchParams, findStopById, showToast, setSearchParams]);

  useEffect(() => {
    const lat = sessionStorage.getItem("user-latitude");
    const lng = sessionStorage.getItem("user-longitude");
    const permissionDenied = sessionStorage.getItem(
      "location-permission-denied"
    );

    if (permissionDenied === "true") return;

    if (!lat || !lng) {
      getUserLocation();
      return;
    }

    if (userLocation && !selectedStartStop) {
      const [latitude, longitude] = userLocation;
      const closest = getClosestStop(latitude, longitude);
      if (closest) setSelectedStartStop(closest);
    }
  }, [userLocation, getUserLocation, selectedStartStop, getClosestStop]);

  const handleSearchByStop = useCallback(async () => {
    if (!selectedStartStop || !selectedDestinationStop) {
      showToast("Please select both start and destination stops", "error");
      return;
    }

    if (!validateStops(selectedStartStop, selectedDestinationStop)) return;

    setIsSearchingForStops(true);

    try {
      const segments = await searchRouteSegments(
        selectedStartStop.id,
        selectedDestinationStop.id
      );

      if (segments.error) {
        showToast(
          `${segments.error}\n(Search is currently being developed. There may be errors!)`,
          "error"
        );
      } else {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          const prevFrom = prev.get("from");
          const prevTo = prev.get("to");
          const prevStop = prev.get("stop");

          newParams.set("from", selectedStartStop.id);
          newParams.set("to", selectedDestinationStop.id);

          const fromChanged = prevFrom !== selectedStartStop.id;
          const toChanged = prevTo !== selectedDestinationStop.id;
          const stopMissing = !prevStop;

          if (fromChanged || toChanged || stopMissing) {
            newParams.set("stop", selectedStartStop.id);
          }

          return newParams;
        });
      }

      return segments;
    } catch (error) {
      console.error("Search error:", error);
      showToast("An unexpected error occurred during search", "error");
    } finally {
      setIsSearchingForStops(false);
    }
  }, [
    selectedStartStop,
    selectedDestinationStop,
    showToast,
    validateStops,
    setSearchParams,
  ]);

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
