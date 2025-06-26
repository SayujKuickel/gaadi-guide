// \react
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// \data
import RouteData from "@/data/route_data.json";
// \type
import type { IRoute } from "@/types/route.types";
// \components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import BusLineTitle from "@/components/bus/BusLineTitle";
import BusStops from "@/components/bus/BusStops/BusStops";
interface ViewStopsWrapperProps {}

const ViewStopsWrapper: React.FC<ViewStopsWrapperProps> = ({}) => {
  const [searchParams] = useSearchParams();
  const [routeData, setRouteData] = useState<IRoute | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const routekey = searchParams.get("route");

    if (!routekey) {
      setError("No route selected. Please select a route to view its stops.");
      setRouteData(null);
      return;
    }

    const route = RouteData.find((rt) => rt.id === routekey);

    if (!route) {
      setError(`The route was not found.`);
      setRouteData(null);
      return;
    }

    setError("");
    setRouteData(route);
  }, [searchParams]);

  if (error) {
    return (
      <Heading className="mb-3 text-center" level={4}>
        <i className="fi fi-rr-triangle-warning block text-4xl" />
        {error}
      </Heading>
    );
  }

  if (!routeData) return null;

  return (
    <>
      <BusLineTitle
        lineColor={routeData.lineColor}
        name={routeData.name}
        level={4}
        className="mb-2"
      />

      {routeData.operator && (
        <p className="flex items-center gap-1 text-offText/80 text-sm">
          <i className="fi fi-rr-bus flex" />
          {routeData.operator}
        </p>
      )}

      {routeData.duration && (
        <p className="flex items-center gap-1 text-offText/80 text-sm">
          <i className="fi fi-rr-clock flex" />
          est: {formatTime(routeData.duration)}
        </p>
      )}

      <div className="overflow-y-scroll scrollbar-sa mt-4">
        <BusStops routeId={routeData?.id} stopsArray={routeData?.stops} />
      </div>
    </>
  );
};

const formatTime = (time: number) => {
  const min = time % 60;
  const hr = Math.floor(time / 60);

  const hrStr = hr > 0 ? `${hr} hour${hr > 1 ? "s" : ""}` : "";
  const minStr = min > 0 ? `${min} min${min > 1 ? "s" : ""}` : "";

  return [hrStr, minStr].filter(Boolean).join(" ");
};

export default ViewStopsWrapper;
