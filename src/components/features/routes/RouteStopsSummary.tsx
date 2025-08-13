// \react
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// \data
import RouteData from "@/data/route_data.json";
// \type
import type { IRoute } from "@/types/route.types";
// \components
import { formatDistance, formatTime } from "@/utils/formatRouteDetails";
import { nameToSlug } from "@/utils/nameToSlug";
import { BusFront, Clock, Route, TriangleAlert } from "lucide-react";
import { siteUrlMappings } from "@/constants/siteConfigs";
import { Heading, LineHeading, VerificationBadge } from "@/components/ui";
import { BusStopsList } from "../bus";

interface RouteStopsSummaryProps {}

const RouteStopsSummary: React.FC<RouteStopsSummaryProps> = ({}) => {
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
      <div className="flex flex-col items-center ">
        <TriangleAlert size={64} />

        <Heading className="mt-3 text-center" level={3}>
          {error}
        </Heading>
      </div>
    );
  }

  if (!routeData) return null;

  return (
    <>
      <div className="mb-3">
        <LineHeading
          lineColor={routeData.lineColor}
          name={routeData.name}
          level={2}
          className="mb-2"
        />

        <VerificationBadge isVerified={routeData.isVerifiedRoute || false} />
      </div>

      {routeData.operator && (
        <p className="flex items-center gap-1 text-offText/80 text-sm mb-1">
          <BusFront size={18} />
          <span>
            {routeData?.operator.map((op, i) => (
              <Link to={`/${siteUrlMappings.operators}/${nameToSlug(op)}`}>
                {i > 0 && ", "}

                {op}
              </Link>
            ))}
          </span>
        </p>
      )}

      {routeData?.details?.duration_mins && (
        <p className="flex items-center gap-1 text-offText/80 text-sm mb-1">
          <Clock size={18} />
          est: {formatTime(routeData?.details?.duration_mins)}
        </p>
      )}

      {routeData?.details?.distance_meter && (
        <p className="flex items-center gap-1 text-offText/80 text-sm mb-1">
          <Route size={18} />
          {formatDistance(routeData?.details?.distance_meter)}
        </p>
      )}

      <div className="overflow-y-scroll scrollbar-sa mt-4">
        <BusStopsList routeId={routeData?.id} stopsArray={routeData?.stops} />
      </div>
    </>
  );
};

export default RouteStopsSummary;
