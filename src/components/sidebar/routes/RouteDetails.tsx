// \react
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// \data
import RouteData from "@/data/route_data.json";
// \type
import type { IRoute } from "@/types/route.types";
// \components
import Heading from "@/components/common/Heading";
import BusLineTitle from "@/components/bus/BusLineTitle";
import RouteStopsList from "@/components/bus/RouteStopsList";
import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
import { formatTime } from "@/utils/formatRouteDetails";
import RouteVerificationStatus from "@/components/ui/RouteVerificationStatus";
interface RouteDetailsProps {}

const RouteDetails: React.FC<RouteDetailsProps> = ({}) => {
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
      <Heading className="mb-3 text-center" level={2}>
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
        level={2}
        className="mb-4"
      />

      <RouteVerificationStatus
        isVerified={routeData.isVerifiedRoute || false}
      />

      {routeData.operator && (
        <p className="flex items-center gap-1 text-offText/80 text-sm mb-1">
          <i className="fi fi-rr-bus flex" />
          {routeData.operator}
        </p>
      )}

      {routeData?.details?.duration_mins && (
        <p className="flex items-center gap-1 text-offText/80 text-sm mb-1">
          <i className="fi fi-rr-clock flex" />
          est: {formatTime(routeData?.details?.duration_mins)}
        </p>
      )}

      <div className="overflow-y-scroll scrollbar-sa mt-4">
        <RouteStopsList routeId={routeData?.id} stopsArray={routeData?.stops} />
      </div>
    </>
  );
};

export default RouteDetails;
