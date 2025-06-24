// \hooks
import ViewWrapper from "@/components/sidebar/sidebarViews/ViewWrapper";
// \data
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import { useState } from "react";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import SearchWrapper from "@/components/sidebar/sidebarViews/SearchWrapper";
import ViewSearchedStops from "@/components/sidebar/sidebarViews/ViewSearchedStops";
import Button from "@/components/common/Button";
import RouteView from "@/components/map/route/RouteView";
import MapPagesLayout from "@/layout/MapPagesLayout";

const SearchPage = () => {
  const [segments, setSegments] = useState<IRouteSegment[] | null>(null);

  return (
    <>
      <MapPagesLayout
        sidebarContent={
          <>
            <ViewWrapper
              hiddenBtn={
                <Button iconStyle="fi fi-rr-search" ariaLabel="show stops" />
              }
            >
              <SearchWrapper setSegments={setSegments} />
            </ViewWrapper>

            {segments && (
              <ViewWrapper
                hiddenBtn={
                  <Button iconStyle="fi fi-rr-route" ariaLabel="show stops" />
                }
              >
                <Heading className="mb-4" level={5}>
                  Follow the Route!
                </Heading>

                <ViewSearchedStops
                  mode="search"
                  headingLevel={5}
                  segments={segments}
                />
              </ViewWrapper>
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
