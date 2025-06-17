import BusLineTitle from "@/components/bus/BusLineTitle";
import BusStops from "@/components/bus/BusStops/BusStops";
import type { IRouteSegment } from "@/utils/searchRouteSegments";

const ViewSearchedStops = ({ segments }: IRouteSegment[]) => {
  console.log(segments);

  return (
    <ul className="space-y-4 max-h-64 overflow-auto scrollbar-sa">
      {segments.map((segment: IRouteSegment) => (
        <div>
          <BusLineTitle
            name={segment.name}
            level={4}
            lineColor={segment.lineColor}
            className="mb-4"
          />

          <BusStops routeId={segment.id} stopsArray={segment.stops} />
        </div>
      ))}
    </ul>
  );
};

export default ViewSearchedStops;
