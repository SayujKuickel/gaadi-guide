// /react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// /data
import route_data from "@/data/route_data.json";
// /types
import type { IRoute } from "@/types/route.types";
// \utils
import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
// /components
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import NotFound from "../NotFound";
import BusLineTitle from "@/components/bus/BusLineTitle";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import RouteStopsList from "@/components/bus/RouteStopsList";

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
          <div className="">
            <div className="bg-surface p-5 rounded-lg mb-8">
              <BusLineTitle
                lineColor={route?.lineColor}
                name={route?.name}
                level={1}
                className="mb-4"
              />

              <section className=" flex items-end justify-between flex-wrap gap-4">
                <div className="">
                  <p className="flex items-center gap-1 text-offText/80 text-sm mb-2">
                    {route.isVerifiedRoute ? (
                      <>
                        <i className="fi fi-rr-shield-trust flex text-sa-green" />
                        <span>Verified Route</span>
                      </>
                    ) : (
                      <>
                        <i className="fi fi-rr-exclamation flex text-sa-red" />
                        <span>Unverified Route</span>
                        <Link
                          to={SITE_SUGGESTION_REDIREECT}
                          target="_blank"
                          className="text-xs text-text"
                        >
                          Please Report Bugs Here*
                        </Link>
                      </>
                    )}
                  </p>

                  {route.operator && (
                    <p className="flex items-center gap-1 text-offText/80 text-sm">
                      <i className="fi fi-rr-bus flex" />
                      {route.operator}
                    </p>
                  )}

                  {route.duration && (
                    <p className="flex items-center gap-1 text-offText/80 text-sm">
                      <i className="fi fi-rr-clock flex" />
                      est: {formatTime(route.duration)}
                    </p>
                  )}
                </div>

                <Link
                  className="block w-fit "
                  to={`/routes?route=${route?.id}`}
                >
                  <Button
                    ariaLabel="View route map"
                    iconStyle="fi fi-rr-map"
                    title="View in Map"
                  />
                </Link>
              </section>
            </div>

            <div className="bg-surface p-5 rounded-lg">
              <Heading level={3} className="mb-3">
                Stops
              </Heading>
              <RouteStopsList routeId={id} stopsArray={route?.stops} />
            </div>
          </div>
        ) : (
          <NotFound title="No route found with id" />
        )}
      </ContainerLayout>
    </PageLayout>
  );
};

const formatTime = (time: number) => {
  const min = time % 60;
  const hr = Math.floor(time / 60);

  const hrStr = hr > 0 ? `${hr} hour${hr > 1 ? "s" : ""}` : "";
  const minStr = min > 0 ? `${min} min${min > 1 ? "s" : ""}` : "";

  return [hrStr, minStr].filter(Boolean).join(" ");
};

export default BusRouteDetailsPage;
