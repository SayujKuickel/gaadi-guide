import BusLineTitle from "@/components/bus/BusLineTitle";
import RouteStopsList from "@/components/bus/RouteStopsList";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import React from "react";

interface SearchedRouteDetailsProps {
  segments: IRouteSegment[];
  headingLevel?: 1 | 2 | 3 | 4 | 5;
  mode: "search";
}
const SearchedRouteDetails: React.FC<SearchedRouteDetailsProps> = ({
  segments,
  headingLevel,
  mode,
}) => {
  return (
    <ul className="space-y-4 overflow-auto scrollbar-sa">
      {segments.map((segment: IRouteSegment, i) => (
        <div key={i} className="mb-4">
          <BusLineTitle
            name={segment.name}
            level={headingLevel ? headingLevel : 4}
            lineColor={segment.lineColor}
            className="mb-3"
          />

          <RouteStopsList
            mode={mode}
            routeId={segment.id}
            stopsArray={segment.stops}
          />
        </div>
      ))}
    </ul>
  );
};

export default SearchedRouteDetails;
