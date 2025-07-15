import { Link } from "react-router-dom";
import type React from "react";
import type { IRoute } from "@/types/route.types";
import Button from "../common/Button";
import BusLineTitle from "./BusLineTitle";
import RouteStopsList from "./RouteStopsList";
import RouteVerificationStatus from "../ui/RouteVerificationStatus";

interface ViewRouteDetailsProps {
  route: IRoute;
  priorityStop?: string;
}

const ViewRouteDetails: React.FC<ViewRouteDetailsProps> = ({
  route,
  priorityStop,
}) => {
  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <BusLineTitle
          className="mb-2"
          lineColor={route?.lineColor}
          name={route?.name}
        />

        <RouteVerificationStatus
          showReportText={false}
          isVerified={route.isVerifiedRoute || false}
        />
      </div>

      <div className="p-4 rounded-lg bg-surface-1/25">
        <RouteStopsList
          routeId={route?.id}
          stopsArray={route?.stops}
          priorityStop={priorityStop}
          itemsToShow={3}
        />

        <div className="flex flex-wrap items-center flex-row gap-3 mt-8">
          <Link className="block w-fit" to={`/bus/${route?.id}`}>
            <Button
              ariaLabel="View All Stops"
              title="View All Stops"
              className="text-xs"
              iconStyle="fi fi-rr-eye"
              variant="secondary"
            />
          </Link>

          <Link className="block w-fit" to={`/routes?route=${route?.id}`}>
            <Button
              ariaLabel="View in map"
              title="View in Map"
              className="text-xs"
              iconStyle="fi fi-rr-map"
              variant="secondary"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ViewRouteDetails;
