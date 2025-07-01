import { Marker, Popup } from "react-leaflet";

import L from "leaflet";

import type { ReactNode } from "react";

interface BusStopViewProps {
  position: [number, number];

  stopName: string;

  lineColor: string;

  popupContent?: ReactNode;
}

const BusStopView: React.FC<BusStopViewProps> = ({
  position,

  stopName,

  lineColor = "#ff0000",

  popupContent,
}) => {
  const customMarker = L.divIcon({
    className: "custom-marker",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
    html: `<div style="position: relative;width: 28px;height: 36px;display: flex;flex-direction: column;align-items: center;justify-content: center;"><div style="background-color: ${lineColor};color: white;width: 28px;height: 28px;border-radius: 50%;display: flex;align-items: center;justify-content: center;font-size: 14px;box-shadow: 0 0 0 2px white, 0 2px 6px rgba(0,0,0,0.3);"><i class="fi fi-rr-bus-alt flex"></i></div><div style="width: 0;height: 0;border-left: 10px solid transparent;border-right: 10px solid transparent;border-top: 8px solid ${lineColor};margin-top: -4px;filter: drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 2px 6px rgba(0,0,0,0.3));"></div></div>`,
  });

  return (
    <Marker position={position} icon={customMarker}>
      {(stopName || popupContent) && (
        <Popup>
          {stopName} <br />
          {popupContent}
        </Popup>
      )}
    </Marker>
  );
};

export default BusStopView;
