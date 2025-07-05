import L from "leaflet";
import { useMap, Polyline } from "react-leaflet";
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

    if (fitToScreen && matchedStops.length > 0) {
      const bounds = L.latLngBounds(
        matchedStops.map((stop) => [stop.lat, stop.lng])
      );
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, stopIds, lineColor, fitToScreen]);

  if (!waypoints.length) return null;

  const routeCoordinates: [number, number][] = waypoints.map((stop) => [
    stop.lat,
    stop.lng,
  ]);

  return (
    <>
      {routeCoordinates.length > 1 && (
        <Polyline
          positions={routeCoordinates}
          color={lineColor}
          weight={4}
          opacity={0.7}
          smoothFactor={1}
        />
      )}

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
