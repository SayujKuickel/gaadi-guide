import { useToast } from "@/context/ToastContext";
import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [flyToPos, setFlyToPos] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const lat = sessionStorage.getItem("user-latitude");
    const lon = sessionStorage.getItem("user-longitude");

    if (lat !== null && lon !== null) {
      setFlyToPos(false);

      setUserLocation([parseFloat(lat), parseFloat(lon)]);
    }
  }, []);

  const getUserLocation = () => {
    if (isSearchingLocation) {
      console.warn("[W] Already searching for location.");
      return;
    }

    setIsSearchingLocation(true);
    setFlyToPos(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);

        sessionStorage.setItem("user-latitude", coords.latitude.toString());
        sessionStorage.setItem("user-longitude", coords.longitude.toString());
        sessionStorage.removeItem("location-permission-denied");

        setIsSearchingLocation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setIsSearchingLocation(false);
        sessionStorage.setItem("location-permission-denied", "true");

        showToast(
          "Failed to get your location. Please enable location services.",
          "error"
        );
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return {
    userLocation,
    isSearchingLocation,
    getUserLocation,
    setUserLocation,
    startLocationSearch: () => setIsSearchingLocation(true),
    stopLocationSearch: () => setIsSearchingLocation(false),
    flyToPos,
  };
};
