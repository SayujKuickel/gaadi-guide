import stops_data from "@/data/stops_data.json";

interface ViewRouteDetailsProps {
  stopsArray: string[];
  itemsToShow?: number;
}

const BusStops: React.FC<ViewRouteDetailsProps> = ({
  stopsArray,
  itemsToShow,
}) => {
  const toShow =
    itemsToShow && itemsToShow > 0 ? itemsToShow : stopsArray.length;

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {stopsArray?.slice(0, toShow)?.map((item, key) => {
          const stop = stops_data.find((el) => el.id === item);

          return (
            <li
              key={key}
              className="flex items-center gap-1.5 relative no-scrollbar"
            >
              <i
                className={`${
                  key > 0 && key < stopsArray?.length - 1
                    ? "fi fi-rr-circle"
                    : "fi fi-rr-dot-circle"
                } w-3 flex text-xs relative`}
              >
                {key > 0 && (
                  <span className="absolute left-1/2 -translate-x-1/2 translate-y-[-250%]">
                    <i className="fi fi-rr-menu-dots-vertical flex text-xs"></i>
                  </span>
                )}
              </i>

              <p className="flex-1 flex items-center gap-1 justify-between ml-2 px-2 py-1.5 bg-surface-1/25 border border-neutral-100/20 rounded-lg text-neutral-100/80 whitespace-nowrap overflow-scroll no-scrollbar">
                {stop?.name}
              </p>
            </li>
          );
        })}
      </ul>

      {stopsArray.length > toShow && (
        <span className="block ml-1 mt-3 text-sm text-text/75">
          Showing {itemsToShow} of {stopsArray.length} Bus Stops.
        </span>
      )}
    </div>
  );
};

export default BusStops;
