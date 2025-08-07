import LineHeading from "@/components/ui/BusLineTitle";
import RouteStopsList from "@/components/bus/RouteStopsList";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import React from "react";

interface SearchedRouteSummaryProps {
  segments: IRouteSegment[];
  headingLevel?: 1 | 2 | 3 | 4 | 5;
  mode: "search";
}
const SearchedRouteSummary: React.FC<SearchedRouteSummaryProps> = ({
  segments,
  headingLevel,
  mode,
}) => {
  return (
    <ul className="space-y-4 overflow-auto scrollbar-sa">
      {segments.map((segment: IRouteSegment, i) => (
        <div key={i} className="mb-4">
          <LineHeading
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

export default SearchedRouteSummary;
