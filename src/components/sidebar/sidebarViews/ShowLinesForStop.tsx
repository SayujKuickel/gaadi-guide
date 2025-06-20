// \react
import { Link } from "react-router-dom";
// \types
import type { IRoute } from "@/types/route.types";
// \components
import BusLineTitle from "@/components/bus/BusLineTitle";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";

interface ShowLinesForStopProps {
  filteredRoutes: IRoute[] | null;
}

const ShowLinesForStop: React.FC<ShowLinesForStopProps> = ({
  filteredRoutes,
}) => {
  if (!filteredRoutes) return null;

  if (!(filteredRoutes.length > 0))
    return <p className="text-offText">This stop is not in any routes</p>;

  return (
    <div className="">
      <Heading className="mb-3" level={5}>
        Lines for this stop
      </Heading>

      <ul className="max-h-32 overflow-auto scrollbar-sa space-y-4">
        {filteredRoutes.map((route, i) => (
          <li key={i}>
            <BusLineTitle
              name={route.name}
              lineColor={route.lineColor}
              level={5}
              className="mb-3"
            />

            <Link className="block w-fit" to={`/routes/?route=${route.id}`}>
              <Button
                title="Show Route"
                iconStyle="fi fi-rr-eye"
                className="text-xs"
                ariaLabel={`View ${route.name} in its own page`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShowLinesForStop;
