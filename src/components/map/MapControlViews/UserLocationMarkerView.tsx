import L from "leaflet";
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { DEFAULT_FLY_TO_POSITION_ZOOM } from "@/constants/mapSettings";

interface UserLocationMarkerViewProps {
  position: [number, number];
}

const UserLocationMarkerView: React.FC<UserLocationMarkerViewProps> = ({
  position,
}) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, DEFAULT_FLY_TO_POSITION_ZOOM);
  }, [position, map]);

  const customMarker = L.divIcon({
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    html: `<i class="fi fi-rr-marker grid place-items-center text-xl w-8 aspect-square bg-red-100 rounded-2xl text-on-surface outline-2" style="background-color: #024885bb; outline-color: #024885"></i>`,
  });

  return (
    <Marker position={position} icon={customMarker}>
      <Popup>You are here!</Popup>
    </Marker>
  );
};

export default UserLocationMarkerView;
