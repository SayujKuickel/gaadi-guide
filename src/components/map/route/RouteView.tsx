import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

import stopsData from "@/data/stops_data.json";
import BusStopView from "../stop/BusStopView";
import type { IStop } from "@/types/stop.types";

interface RouteViewProps {
  stopIds: string[];
  lineColor: string;
  fitToScreen?: boolean;
}

const RouteView: React.FC<RouteViewProps> = ({
  stopIds,
  lineColor,
  fitToScreen = false,
}) => {
  const map = useMap();
  const [waypoints, setWaypoints] = useState<IStop[]>([]);

  useEffect(() => {
    if (!map || stopIds.length === 0) return;

    const matchedStops: IStop[] = stopIds
      .map((id) => stopsData.find((stop) => stop.id === id))
      .filter(Boolean) as IStop[];

    setWaypoints(matchedStops);

    const routingControl = L.Routing.control({
      waypoints: matchedStops.map((point) => L.latLng(point.lat, point.lng)),
      routeWhileDragging: false,
      fitSelectedRoutes: fitToScreen,
      addWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: lineColor, weight: 5, opacity: 0.75 }],
        extendToWaypoints: true,
        missingRouteTolerance: 100,
      },
      containerClassName: "hidden",
    });

    routingControl.addTo(map);

    return () => {
      routingControl.remove();
    };
  }, [map, stopIds, lineColor, fitToScreen]);

  if (!waypoints.length) return null;

  return (
    <>
      {waypoints.map((point, index) => (
        <BusStopView
          key={point.id ?? index}
          lineColor={lineColor}
          stopName={point.name}
          position={[point.lat, point.lng]}
        />
      ))}
    </>
  );
};

export default RouteView;
