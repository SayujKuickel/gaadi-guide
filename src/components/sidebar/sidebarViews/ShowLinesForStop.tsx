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
      <Heading className="mb-3" level={4}>
        Routes for this stop.
      </Heading>

      <ul className="max-h-32 md:max-h-52 overflow-auto scrollbar-sa">
        {filteredRoutes.map((route, i) => (
          <li
            key={i}
            className="border-y border-y-surface-3/75 hover:bg-surface-3/25 first:border-t-0 last:border-b-0"
          >
            <Link
              className="w-full h-full block py-2"
              to={`/routes/?route=${route.id}`}
            >
              <BusLineTitle
                name={route.name}
                lineColor={route.lineColor}
                level={5}
                className=""
              />

              {/* <Button
                title="View"
                iconStyle="fi fi-rr-eye"
                className="text-xs"
                ariaLabel={`View ${route.name} in its own page`}
              /> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShowLinesForStop;
