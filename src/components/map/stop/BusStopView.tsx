// \react
// import { useEffect, useState } from "react";
// \leaflet
import { Marker, Popup } from "react-leaflet";
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
  // const map = useMap();
  // const [zoom, setZoom] = useState(0);

  // useEffect(() => {
  //   setZoom(map.getZoom());
  // }, [map]);

  // useMapEvents({
  //   zoomend: (e) => setZoom(e.target._zoom),
  //   move: (e) => setZoom(e.target._zoom),
  // });

  const customMarker = L.divIcon({
    className: "custom-marker",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
    html: `<div style="position: relative;width: 28px;height: 36px;display: flex;flex-direction: column;align-items: center;justify-content: center;"><div style="background-color: ${lineColor};color: white;width: 28px;height: 28px;border-radius: 50%;display: flex;align-items: center;justify-content: center;font-size: 14px;box-shadow: 0 0 0 2px white, 0 2px 6px rgba(0,0,0,0.3);"><i class="fi fi-rr-bus-alt flex"></i></div><div style="width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 8px solid ${lineColor};margin-top: -4px;"></div></div>`,
  });

  return (
    <Marker position={position} icon={customMarker}>
      {stopName && <Popup>{stopName}</Popup>}
    </Marker>
  );

  // return zoom > 0 ? (
  // <<!marker here!>>
  // ) : (
  //   <Circle center={position} radius={20} pathOptions={{ color: lineColor }}>
  //     {stopName && <Popup>{stopName}</Popup>}
  //   </Circle>
  // );
};

export default BusStopView;
