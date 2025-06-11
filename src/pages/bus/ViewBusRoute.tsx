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

const ViewBusRoute = () => {
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
      <ContainerLayout isSmall={false} className="pt-4">
        <Link to={"/bus"} className="">
          <Button
            ariaLabel="Go back to previous page button"
            title="Back"
            iconStyle="fi fi-rr-angle-small-left"
            className="text-sm mb-6"
          />
        </Link>
      </ContainerLayout>

      <ContainerLayout className="pt-18 md:pt-12">
        {route ? (
          <>
            <BusLineTitle
              className="mb-3"
              lineColor={route?.lineColor}
              name={route?.name}
              level={2}
            />

            <BusStops stopsArray={route?.stops} />
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
