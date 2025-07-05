// \hooks
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
// \data
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import { useEffect, useState } from "react";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import SearchWrapper from "@/components/sidebar/search/SearchWrapper";
import ViewSearchedStops from "@/components/sidebar/search/ViewSearchedStops";
import RouteView from "@/components/map/route/RouteView";
import MapPageLayout from "@/layout/MapPageLayout";
import ResultsWrapper from "@/components/sidebar/wrappers/ResultsWrapper";
import BusStopView from "@/components/map/stop/BusStopView";
import { Link, useSearchParams } from "react-router-dom";
import type { IStop } from "@/types/stop.types";
import stops_data from "@/data/stops_data.json";

const SearchPage = () => {
  const [segments, setSegments] = useState<IRouteSegment[] | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [searchParams] = useSearchParams();
  const [paramsStop, setParamsStop] = useState<IStop | null>(null);
  const stop = searchParams.get("stop");

  useEffect(() => {
    if (!stop) return;

    const stopData = stops_data.find((item: IStop) => item.id === stop);

    if (!stopData) {
      console.info("[W] Invalid stop id found in url");
      return;
    }

    setParamsStop(stopData);
  }, [stop]);

  return (
    <MapPageLayout
      sidebarContent={
        <>
          <ViewWrapper>
            <SearchWrapper
              setShowResults={setShowResults}
              setSegments={setSegments}
            />

            <span className="text-xs leading-tight block text-offText/75 mt-2">
              This feature is under development. If you find any bugs, please
              report{" "}
              <Link
                className="text-text"
                to={
                  "https://garrulous-belly-2d2.notion.site/ebd/2172054224e680209d1dd7541bc86f48?pvs=143"
                }
                target="_blank"
              >
                here.
              </Link>
            </span>
          </ViewWrapper>

          {showResults && segments && (
            <ResultsWrapper onClose={() => setShowResults(false)}>
              <Heading className="mb-4" level={2}>
                Follow the Route!
              </Heading>

              <ViewSearchedStops
                mode="search"
                headingLevel={3}
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
                  showDetailedPopup={false}
                />
              ))}
            </>
          )}

          {paramsStop && !segments && (
            <BusStopView
              stopId={paramsStop.id}
              stopName={paramsStop.name}
              position={[paramsStop.lat, paramsStop.lng]}
              lineColor="#bc2c36"
            />
          )}
          <FlyToStop />
        </>
      }
    />
  );
};

export default SearchPage;
