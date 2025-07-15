import Button from "@/components/common/Button";
import stops_data from "@/data/stops_data.json";
import { Link, useLocation } from "react-router-dom";

interface ViewRouteDetailsProps {
  stopsArray: string[];
  itemsToShow?: number;
  routeId?: string;
  priorityStop?: string;
  mode?: "search" | "route";
}

const RouteStopsList: React.FC<ViewRouteDetailsProps> = ({
  stopsArray,
  itemsToShow,
  routeId,
  priorityStop,
  mode = "route",
}) => {
  const location = useLocation();

  // Merge existing URL params with new params, return as query string
  const getMergedSearch = (extraParams: Record<string, string>) => {
    const currentParams = new URLSearchParams(location.search);

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      }
    });

    return `?${currentParams.toString()}`;
  };

  const reorderedStops = [
    ...(priorityStop && stopsArray.includes(priorityStop)
      ? [priorityStop]
      : []),
    ...stopsArray.filter((stopId) => stopId !== priorityStop),
  ];

  const toShow =
    itemsToShow && itemsToShow > 0 ? itemsToShow : reorderedStops.length;

  return (
    <>
      <ul className="flex flex-col gap-4">
        {reorderedStops.slice(0, toShow).map((item, key) => {
          const stop = stops_data.find((el) => el.id === item);
          if (!stop) return null;

          return (
            <li key={key} className={`flex items-center gap-1.5 relative pr-1`}>
              <i
                className={`${
                  key > 0 && key < reorderedStops.length - 1
                    ? "fi fi-rr-circle"
                    : stop.id === priorityStop
                    ? "fi fi-rr-land-layer-location"
                    : "fi fi-rr-dot-circle"
                } w-3 flex text-xs relative`}
              >
                {key > 0 && (
                  <span className="absolute left-1/2 -translate-x-1/2 translate-y-[-250%]">
                    <i className="fi fi-rr-menu-dots-vertical flex text-xs"></i>
                  </span>
                )}
              </i>

              <p
                className={`flex-1 flex items-center gap-1 justify-between ml-2 px-2 py-1.5 bg-surface-1/25 border border-neutral-100/20 rounded-lg text-neutral-100/80 whitespace-nowrap overflow-x-scroll no-scrollbar ${
                  priorityStop === stop.id && "outline outline-green-600/30"
                }`}
              >
                {stop.name}
              </p>

              {routeId && (
                <Link
                  to={
                    mode === "search"
                      ? `/search${getMergedSearch({ stop: stop.id })}`
                      : `/routes${getMergedSearch({
                          route: routeId,
                          stop: stop.id,
                        })}`
                  }
                >
                  <Button
                    iconStyle="fi fi-rr-eye"
                    variant="secondary"
                    ariaLabel={`Navigate to ${stop.name}`}
                  />
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <span className="block ml-1 mt-3 text-sm text-text/75">
        {stopsArray.length > toShow ? (
          <>
            Showing {itemsToShow} of {stopsArray.length} Bus Stops.
          </>
        ) : (
          <>Total {stopsArray.length} Stops.</>
        )}
      </span>
    </>
  );
};

export default RouteStopsList;
