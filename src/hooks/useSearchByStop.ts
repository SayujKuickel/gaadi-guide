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

  // Find stop by id
  const findStopById = useCallback((id: string): IStopOption | null => {
    const stop = stops_data.find((stop) => stop.id === id);
    return stop ? { id: stop.id, name: stop.name } : null;
  }, []);

  // Validation
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

  // Get closest stop from coordinates
  const getClosestStop = (lat: number, lng: number): IStopOption | null => {
    let minDist = Infinity;
    let closest: IStopOption | null = null;

    for (const stop of stops_data) {
      const dx = stop.lat - lat;
      const dy = stop.lng - lng;
      const dist = dx * dx + dy * dy;

      if (dist < minDist) {
        minDist = dist;
        closest = { id: stop.id, name: stop.name };
      }
    }

    return closest;
  };

  // get the to and from params from the url and set them as the selected item
  useEffect(() => {
    const fromId = searchParams.get("from");
    const toId = searchParams.get("to");

    if (fromId) {
      const stop = findStopById(fromId);
      if (stop) setSelectedStartStop(stop);
    }

    if (toId) {
      const stop = findStopById(toId);
      if (stop) setSelectedDestinationStop(stop);
    }
  }, []);

  // Get location to set the start stop closest to user.
  useEffect(() => {
    const lat = sessionStorage.getItem("user-latitude");
    const lng = sessionStorage.getItem("user-longitude");
    const permissionDenied = sessionStorage.getItem(
      "location-permission-denied"
    );

    if (permissionDenied === "true") return;

    if (!lat || !lng) return getUserLocation();

    if (userLocation) {
      const [latitude, longitude] = userLocation;
      const closest = getClosestStop(latitude, longitude);

      if (closest && !selectedStartStop) setSelectedStartStop(closest);
    }
  }, [userLocation, getUserLocation, selectedStartStop]);

  // handles the search when user clicks search button.
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
        setSearchParams({
          from: selectedStartStop.id,
          to: selectedDestinationStop.id,
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
    setSearchParams,
    showToast,
    validateStops,
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
