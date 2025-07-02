// /react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// /components
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";
import NotFound from "../NotFound";
import BusStops from "@/components/bus/BusStops/BusStops";
import BusLineTitle from "@/components/bus/BusLineTitle";
// /data
import RouteData from "@/data/route_data.json";
// /types
import type { IRoute } from "@/types/route.types";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";

const ViewBusRoute = ({}) => {
  const { id } = useParams();
  const [route, setRoute] = useState<IRoute | null>(null);

  useEffect(() => {
    const foundRoute = RouteData.find((r) => r.id === id);

    if (!foundRoute) {
      console.warn("[w] No route with ID:", id);
      return;
    }

    setRoute(foundRoute);
  }, [id]);

  return (
    <PageLayout>
      <ContainerLayout className="">
        {route ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <BusLineTitle
                className="mb-3"
                lineColor={route?.lineColor}
                name={route?.name}
                level={2}
              />

              <Link
                className="block w-fit mb-4"
                to={`/routes?route=${route?.id}`}
              >
                <Button
                  ariaLabel="View route map"
                  iconStyle="fi fi-rr-map"
                  title="View in Map"
                />
              </Link>
            </div>

            <div className="bg-surface p-5 rounded-lg">
              <BusStops routeId={id} stopsArray={route?.stops} />
            </div>

            <span className="block ml-1 mt-3 text-sm text-text/75">
              Total {route?.stops?.length} stops
            </span>
          </>
        ) : (
          <NotFound title="No route found with id" />
        )}
      </ContainerLayout>
    </PageLayout>
  );
};

export default ViewBusRoute;
