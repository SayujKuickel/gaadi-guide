import type { IRoute } from "@/types/route.types";
import BusLineTitle from "./BusLineTitle";
import BusStops from "./BusStops/BusStops";
import type React from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

interface ViewRouteDetailsProps {
  route: IRoute;
  priorityStop?: string;
}

const ViewRouteDetails: React.FC<ViewRouteDetailsProps> = ({
  route,
  priorityStop,
}) => {
  return (
    <section className="p-4 rounded-lg bg-surface-1/25">
      <BusLineTitle
        className="mb-4"
        lineColor={route?.lineColor}
        name={route?.name}
      />

      <BusStops
        routeId={route?.id}
        stopsArray={route?.stops}
        priorityStop={priorityStop}
        itemsToShow={4}
      />

      <div className="flex md:items-center flex-row gap-2 mt-8">
        <Link className="block w-fit" to={`/bus/${route?.id}`}>
          <Button
            ariaLabel="View All Stops"
            title="View All Stops"
            className="text-sm"
            iconStyle="fi fi-rr-eye"
            variant="secondary"
          />
        </Link>

        <Link className="block w-fit" to={`/routes?route=${route?.id}`}>
          <Button
            ariaLabel="View in map"
            title="View in Map"
            className="text-sm"
            iconStyle="fi fi-rr-map"
            variant="secondary"
          />
        </Link>
      </div>
    </section>
  );
};

export default ViewRouteDetails;
