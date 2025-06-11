import type { IRoute } from "@/types/route.types";
import BusLineTitle from "./BusLineTitle";
import BusStops from "./BusStops/BusStops";
import type React from "react";
import Button from "../common/Button";
import { Link } from "react-router-dom";

interface ViewRouteDetailsProps {
  route: IRoute;
}

const ViewRouteDetails: React.FC<ViewRouteDetailsProps> = ({ route }) => {
  return (
    <section className="p-3 rounded-lg bg-surface-1/25  mb-12">
      <BusLineTitle
        className="mb-3"
        lineColor={route?.lineColor}
        name={route?.name}
      />

      <BusStops stopsArray={route?.stops} itemsToShow={3} />

      <br />

      <Link className="block w-fit" to={`/bus/${route?.id}`}>
        <Button
          ariaLabel="View All Stops"
          title="View All"
          className="text-sm mb-6"
          iconStyle="fi fi-rr-eye"
        />
      </Link>
    </section>
  );
};

export default ViewRouteDetails;
