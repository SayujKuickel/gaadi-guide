// /react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// /data
import route_data from "@/data/route_data.json";
// /types
import type { IRoute } from "@/types/route.types";
import {
  Button,
  Heading,
  LineHeading,
  VerificationBadge,
} from "@/components/ui";
import RouteStopsList from "@/components/bus/RouteStopsList";
import { nameToSlug } from "@/utils/nameToSlug";
import { Bus, BusFront, Clock, Map, Route } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
import { ContainerLayout } from "@/components/layout";
import NotFound from "../NotFound";
import RouteSummaryCard from "@/components/cards/RouteDetailsCard";
import { formatDistance, formatTime } from "@/utils/formatRouteDetails";

const BusRouteSummaryPage = ({}) => {
  const { id } = useParams();
  const [route, setRoute] = useState<IRoute | null>(null);

  useEffect(() => {
    const foundRoute = route_data.find((r) => r.id === id);

    if (!foundRoute) {
      console.warn("[w] No route with ID:", id);
      return;
    }

    setRoute(foundRoute);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>
          {route ? route?.name : "Route Not Found"} {SITE_TOP_TITLE}
        </title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.bus}/${id}`}
        />
      </Helmet>

      <ContainerLayout size="xs">
        {route ? (
          <>
            <section className="mb-8">
              <div className=" flex items-end justify-between flex-wrap gap-2 mb-4">
                <LineHeading
                  lineColor={route?.lineColor}
                  name={route?.name}
                  level={1}
                />

                <div className="flex items-center justify-between w-full md:w-fit md:flex-col md:items-end gap-1">
                  <VerificationBadge
                    isVerified={route.isVerifiedRoute || false}
                    showReportText={false}
                  />

                  <Link
                    className="block w-fit"
                    to={`/${siteUrlMappings.routes}?route=${route?.id}`}
                  >
                    <Button
                      ariaLabel="View route map"
                      icon={<Map size={16} />}
                      title="View in Map"
                      className="text-xs"
                    />
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {route?.operator && (
                <RouteSummaryCard
                  label={"Operated By"}
                  value={route?.operator.map((item, i) => (
                    <Link
                      to={`/${siteUrlMappings.operators}/${nameToSlug(item)}`}
                    >
                      {i > 0 && ", "}
                      {item}
                    </Link>
                  ))}
                  icon={<BusFront />}
                  lineColor={route?.lineColor}
                />
              )}

              {route?.details?.duration_mins && (
                <RouteSummaryCard
                  label={"Estimated Duration"}
                  value={formatTime(route?.details?.duration_mins)}
                  icon={<Clock />}
                  lineColor={route?.lineColor}
                />
              )}

              {route?.details?.distance_meter && (
                <RouteSummaryCard
                  label={"Total Distance"}
                  value={formatDistance(route?.details?.distance_meter)}
                  icon={<Route />}
                  lineColor={route?.lineColor}
                />
              )}

              {route?.details?.total_bus && (
                <RouteSummaryCard
                  label={"Total Bus"}
                  value={route?.details?.total_bus}
                  icon={<Bus />}
                  lineColor={route?.lineColor}
                />
              )}
            </section>

            <div className="bg-surface p-5 rounded-lg">
              <Heading level={2} className="mb-3">
                Stops
              </Heading>

              <RouteStopsList routeId={id} stopsArray={route?.stops} />
            </div>
          </>
        ) : (
          <NotFound title="No route found with id" />
        )}
      </ContainerLayout>
    </>
  );
};

export default BusRouteSummaryPage;
