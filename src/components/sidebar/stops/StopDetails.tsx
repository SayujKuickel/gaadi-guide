// \react
import { Link } from "react-router-dom";
// \types
import type { IRoute } from "@/types/route.types";
// \components
import BusLineTitle from "@/components/bus/BusLineTitle";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import { Map } from "lucide-react";
import { siteUrlMappings } from "@/constants/siteConfigs";

interface StopDetailsProps {
  filteredRoutes: IRoute[] | null;
}

const StopDetails: React.FC<StopDetailsProps> = ({ filteredRoutes }) => {
  if (!filteredRoutes) return null;

  if (!(filteredRoutes.length > 0))
    return <p className="text-offText">This stop is not in any routes</p>;

  return (
    <div className="">
      <Heading className="mb-3" level={2}>
        Routes for this stop.
      </Heading>

      <ul className="overflow-auto scrollbar-sa">
        {filteredRoutes.map((route, i) => (
          <li
            key={i}
            className="border-y border-y-surface-3/75 hover:bg-surface-3/25 first:border-t-0 last:border-b-0"
          >
            <Link
              className="w-full h-full block py-2 sm:flex sm:items-center sm:justify-between"
              to={`/${siteUrlMappings.routes}?route=${route.id}`}
            >
              <BusLineTitle
                name={route.name}
                lineColor={route.lineColor}
                level={5}
                className=""
              />

              <Button
                title="View"
                icon={<Map size={16} />}
                className="text-xs mt-2 md:hidden sm:mt-0"
                ariaLabel={`View ${route.name} in its own page`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StopDetails;
