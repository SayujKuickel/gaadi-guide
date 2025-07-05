import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import stopsData from "@/data/stops_data.json";
import BusStopView from "../stop/BusStopView";
import type { IStop } from "@/types/stop.types";

declare module "leaflet" {
  namespace Routing {
    function control(options?: any): any;
  }
}

interface RouteViewProps {
  stopIds: string[];
  lineColor: string;
  fitToScreen?: boolean;
  showDetailedPopup?: boolean;
}

const RouteView: React.FC<RouteViewProps> = ({
  stopIds,
  lineColor,
  fitToScreen = false,
  showDetailedPopup,
}) => {
  const map = useMap();
  const [waypoints, setWaypoints] = useState<IStop[]>([]);
  const routingControlRef = useRef<any>(null);

  useEffect(() => {
    if (!map || stopIds.length === 0) return;

    const matchedStops: IStop[] = stopIds
      .map((id) => stopsData.find((stop) => stop.id === id))
      .filter(Boolean) as IStop[];

    setWaypoints(matchedStops);

    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }

    if (matchedStops.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: matchedStops.map((point) => L.latLng(point.lat, point.lng)),
      routeWhileDragging: false,
      fitSelectedRoutes: fitToScreen,
      addWaypoints: false,
      show: false,
      createMarker: () => null,
      lineOptions: {
        styles: [
          {
            color: lineColor,
            weight: 6,
            opacity: 0.75,
            lineCap: "round",
            lineJoin: "round",
          },
        ],
        extendToWaypoints: true,
        missingRouteTolerance: 500,
      },
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "walking",
      }),
      containerClassName: "hidden",
    });

    routingControl.addTo(map);
    routingControlRef.current = routingControl;

    routingControl.on("routesfound", function (e: any) {
      console.log("Route found:", e.routes[0]);
    });

    routingControl.on("routingerror", function (e: any) {
      console.warn("Routing error:", e.error);
    });

    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
        routingControlRef.current = null;
      }
    };
  }, [map, stopIds, lineColor, fitToScreen]);

  useEffect(() => {
    return () => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
      }
    };
  }, []);

  if (!waypoints.length) return null;

  return (
    <>
      {waypoints.map((point) => (
        <BusStopView
          key={point.id}
          stopId={point.id}
          stopName={point.name}
          position={[point.lat, point.lng]}
          showDetailedPopup={showDetailedPopup}
          lineColor={lineColor}
        />
      ))}
    </>
  );
};

export default RouteView;
