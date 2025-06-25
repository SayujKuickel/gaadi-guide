import L from "leaflet";
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { DEFAULT_FLY_TO_POSITION_ZOOM } from "@/constants/mapSettings";

interface UserLocationMarkerViewProps {
  position: [number, number];
  flyToPos: boolean;
}

const UserLocationMarkerView: React.FC<UserLocationMarkerViewProps> = ({
  position,
  flyToPos,
}) => {
  const map = useMap();

  useEffect(() => {
    if (flyToPos) {
      map.flyTo(position, DEFAULT_FLY_TO_POSITION_ZOOM);
    }
  }, [position, map]);

  const customMarker = L.divIcon({
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    html: `<div class="marker-container"> <i class="fi fi-rr-marker text-2xl marker-icon"></i> <div class="animate-pulse-ring"></div> </div>`,
  });

  return (
    <Marker position={position} icon={customMarker}>
      <Popup>You are here!</Popup>
    </Marker>
  );
};

export default UserLocationMarkerView;
