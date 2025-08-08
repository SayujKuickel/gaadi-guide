import { siteUrlMappings } from "@/constants/siteConfigs";
import stops_data from "@/data/stops_data.json";
import {
  CircleDashed,
  CircleDot,
  EllipsisVertical,
  Eye,
  MapPinned,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui";

interface ViewBusStopsSummaryProps {
  stopsArray: string[];
  itemsToShow?: number;
  routeId?: string;
  priorityStop?: string;
  mode?: "search" | "route";
}

const BusStopsList: React.FC<ViewBusStopsSummaryProps> = ({
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
              <p className="relative text-offText/75">
                {key > 0 && key < reorderedStops.length - 1 ? (
                  <CircleDashed size={16} />
                ) : stop.id === priorityStop ? (
                  <MapPinned size={16} />
                ) : (
                  <CircleDot size={16} />
                )}

                {key > 0 && (
                  <span className="absolute left-1/2 -translate-x-1/2 translate-y-[-275%]">
                    <EllipsisVertical size={16} />
                  </span>
                )}
              </p>

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
                      ? `/${siteUrlMappings.search}${getMergedSearch({
                          stop: stop.id,
                        })}`
                      : `/${siteUrlMappings.routes}${getMergedSearch({
                          route: routeId,
                          stop: stop.id,
                        })}`
                  }
                >
                  <Button
                    icon={<Eye size={16} />}
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

export default BusStopsList;
