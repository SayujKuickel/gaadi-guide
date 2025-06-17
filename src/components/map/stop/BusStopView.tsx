// \react
import { useEffect, useState } from "react";
// \leaflet
import { Circle, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

interface BusStopViewProps {
  position: [number, number];
  stopName: string;
  lineColor: string;
}

const BusStopView: React.FC<BusStopViewProps> = ({
  position,
  stopName,
  lineColor = "#ff0000",
}) => {
  const map = useMap();
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    setZoom(map.getZoom());
  }, [map]);

  useMapEvents({
    zoomend: (e) => setZoom(e.target._zoom),
    move: (e) => setZoom(e.target._zoom),
  });

  const customMarker = L.divIcon({
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    html: `<i style="background-color: ${lineColor}; outline-color: ${lineColor}" class="w-6 aspect-square rounded-full text-white outline-2 grid place-items-center fi fi-rr-bus-alt"></i>`,
  });

  return zoom > 0 ? (
    <Marker position={position} icon={customMarker}>
      {stopName && <Popup>{stopName}</Popup>}
    </Marker>
  ) : (
    <Circle center={position} radius={20} pathOptions={{ color: lineColor }}>
      {stopName && <Popup>{stopName}</Popup>}
    </Circle>
  );
};

export default BusStopView;
