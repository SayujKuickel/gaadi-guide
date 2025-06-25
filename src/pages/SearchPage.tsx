// \hooks
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
// \data
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import { useState } from "react";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import SearchWrapper from "@/components/sidebar/search/SearchWrapper";
import ViewSearchedStops from "@/components/sidebar/search/ViewSearchedStops";
import RouteView from "@/components/map/route/RouteView";
import MapPageLayout from "@/layout/MapPageLayout";
import ResultsWrapper from "@/components/sidebar/wrappers/ResultsWrapper";

const SearchPage = () => {
  const [segments, setSegments] = useState<IRouteSegment[] | null>(null);
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <MapPageLayout
        sidebarContent={
          <>
            <ViewWrapper>
              <SearchWrapper
                setShowResults={setShowResults}
                setSegments={setSegments}
              />
            </ViewWrapper>

            {showResults && segments && (
              <ResultsWrapper onClose={() => setShowResults(false)}>
                <Heading className="mb-4" level={4}>
                  Follow the Route!
                </Heading>

                <ViewSearchedStops
                  mode="search"
                  headingLevel={5}
                  segments={segments}
                />
              </ResultsWrapper>
            )}
          </>
        }
        mapContent={
          <>
            {segments && (
              <>
                {segments?.map((segment) => (
                  <RouteView
                    key={segment.id}
                    stopIds={segment?.stops}
                    fitToScreen={false}
                    lineColor={segment?.lineColor}
                  />
                ))}
              </>
            )}

            <FlyToStop />
          </>
        }
      />
    </>
  );
};

export default SearchPage;
