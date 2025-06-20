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
        className="mb-4"
      />

      <section className="relative">
        <div className="absolute left-[0px] bottom-[0px] z-10 w-full h-6 bg-gradient-to-t from-surface to-transparent"></div>

        <div className="overflow-y-scroll scrollbar-sa h-32 md:h-48 pb-6">
          <BusStops routeId={routeData?.id} stopsArray={routeData?.stops} />
        </div>
      </section>
    </>
  );
};

export default ViewStopsWrapper;
