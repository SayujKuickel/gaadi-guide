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

  // Get closest stop from coordinates (lng = X, lat = Y)
  const getClosestStop = useCallback(
    (lat: number, lng: number): IStopOption | null => {
      let minDist = Infinity;
      let closest: IStopOption | null = null;

      for (const stop of stops_data) {
        // lng = X, lat = Y
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

  // Sync selected stops from URL params
  useEffect(() => {
    const fromId = searchParams.get("from");
    const toId = searchParams.get("to");

    if (fromId) {
      const stop = findStopById(fromId);
      if (stop) setSelectedStartStop(stop);
      else {
        setSelectedStartStop(null);
        showToast(`Invalid start stop ID in URL: ${fromId}`, "error");
      }
    } else {
      setSelectedStartStop(null);
    }

    if (toId) {
      const stop = findStopById(toId);
      if (stop) setSelectedDestinationStop(stop);
      else {
        setSelectedDestinationStop(null);
        showToast(`Invalid destination stop ID in URL: ${toId}`, "error");
      }
    } else {
      setSelectedDestinationStop(null);
    }
  }, [searchParams, findStopById, showToast]);

  // Fetch user location and set closest stop as start if not set
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

  // Handles the search when user clicks search button.
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
        // Update URL params to sync state
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
