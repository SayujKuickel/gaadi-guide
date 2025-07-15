// /react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// /data
import route_data from "@/data/route_data.json";
// /types
import type { IRoute } from "@/types/route.types";
// /components
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import NotFound from "../NotFound";
import BusLineTitle from "@/components/bus/BusLineTitle";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import RouteStopsList from "@/components/bus/RouteStopsList";
import { formatDistance, formatTime } from "@/utils/formatRouteDetails";
import RouteVerificationStatus from "@/components/ui/RouteVerificationStatus";
import { nameToSlug } from "@/utils/nameToSlug";
import RouteDetailsCard from "@/components/ui/cards/RouteDetailsCard";

const BusRouteDetailsPage = ({}) => {
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
    <PageLayout>
      <ContainerLayout size="xs">
        {route ? (
          <>
            <section className="mb-8">
              <div className=" flex items-end justify-between flex-wrap gap-2 mb-6">
                <BusLineTitle
                  lineColor={route?.lineColor}
                  name={route?.name}
                  level={1}
                />

                <div className="flex flex-col items-end gap-1">
                  <RouteVerificationStatus
                    isVerified={route.isVerifiedRoute || false}
                    showReportText={false}
                  />

                  <Link
                    className="block w-fit"
                    to={`/routes?route=${route?.id}`}
                  >
                    <Button
                      ariaLabel="View route map"
                      iconStyle="fi fi-rr-map"
                      title="View in Map"
                      className="text-xs"
                    />
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 md:mb-4">
              {route?.operator && (
                <Link to={`/operators/${nameToSlug(route?.operator)}`}>
                  <RouteDetailsCard
                    label={"Operated By"}
                    value={route?.operator}
                    icon={"fi fi-rr-bus-alt"}
                    lineColor={route?.lineColor}
                  />
                </Link>
              )}

              {route?.details?.duration_mins && (
                <RouteDetailsCard
                  label={"Total Duration"}
                  value={formatTime(route?.details?.duration_mins)}
                  icon={"fi fi-rr-clock-three"}
                  lineColor={route?.lineColor}
                />
              )}

              {route?.details?.distance_meter && (
                <RouteDetailsCard
                  label={"Total Distance"}
                  value={formatDistance(route?.details?.distance_meter)}
                  icon={"fi fi-rr-map-location-track"}
                  lineColor={route?.lineColor}
                />
              )}

              {route?.details?.total_bus && (
                <RouteDetailsCard
                  label={"Total Bus"}
                  value={route?.details?.total_bus}
                  icon={"fi fi-rr-bus-alt"}
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
    </PageLayout>
  );
};

export default BusRouteDetailsPage;
