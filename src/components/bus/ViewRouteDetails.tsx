import { Link } from "react-router-dom";
import type React from "react";
import type { IRoute } from "@/types/route.types";
import Button from "../common/Button";
import BusLineTitle from "./BusLineTitle";
import RouteStopsList from "./RouteStopsList";
import RouteVerificationStatus from "../ui/RouteVerificationStatus";
import { Eye, Map } from "lucide-react";

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
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        {/* <div>
            <BusLineTitle lineColor={route?.lineColor} name={route?.name} />

            {route.operator && (
              <Link
                className="text-sm text-offText/80 hover:text-offText flex items-center gap-1"
                to={`/operators/${nameToSlug(route.operator)}`}
              >
                By {route.operator} <ExternalLink size={12} />
              </Link>
            )}
          </div> */}

        <BusLineTitle lineColor={route?.lineColor} name={route?.name} />

        <RouteVerificationStatus
          showReportText={false}
          isVerified={route.isVerifiedRoute || false}
        />
      </div>

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
            icon={<Eye size={16} />}
            variant="secondary"
          />
        </Link>

        <Link className="block w-fit" to={`/routes?route=${route?.id}`}>
          <Button
            ariaLabel="View in map"
            title="View in Map"
            className="text-xs"
            icon={<Map size={16} />}
            variant="secondary"
          />
        </Link>
      </div>
    </section>
  );
};

export default ViewRouteDetails;
