import BusLineTitle from "@/components/bus/BusLineTitle";
import BusStops from "@/components/bus/BusStops/BusStops";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import React from "react";

interface ViewSearchedStopsProps {
  segments: IRouteSegment[];
  headingLevel?: 1 | 2 | 3 | 4 | 5;
  mode: "search";
}
const ViewSearchedStops: React.FC<ViewSearchedStopsProps> = ({
  segments,
  headingLevel,
  mode,
}) => {
  return (
    <ul className="space-y-4  max-h-32 md:max-h-52 overflow-auto scrollbar-sa pb-6">
      {segments.map((segment: IRouteSegment, i) => (
        <React.Fragment key={i}>
          <BusLineTitle
            name={segment.name}
            level={headingLevel ? headingLevel : 4}
            lineColor={segment.lineColor}
            className="mb-3"
          />

          <BusStops
            mode={mode}
            routeId={segment.id}
            stopsArray={segment.stops}
          />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ViewSearchedStops;
