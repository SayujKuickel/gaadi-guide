// \React
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
// \hooks
import ViewWrapper from "@/components/sidebar/wrappers/SidebarPanel";
// \data
import FlyToStop from "@/components/map/stop/FlyToStop";
import stops_data from "@/data/stops_data.json";
// \types
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import type { IStop } from "@/types/stop.types";
// \settings
import { SITE_SUGGESTION_REDIREECT } from "@/constants/siteConfigs";
// \components
import Heading from "@/components/common/Heading";
import SearchWrapper from "@/components/sidebar/search/SearchWrapper";
import MapControlsContainer from "@/components/containers/MapControlsContainer";
import SidebarViewsContainer from "@/components/containers/SidebarViewsContainer";
import RoutePolyLineRenderer from "@/components/map/route/RoutePolyLineRenderer";
import BusStopMarker from "@/components/map/markers/BusStopMarker";
import ResultsBottomSheet from "@/components/sidebar/wrappers/ResultsBottomSheet";
import SearchedRouteDetails from "@/components/sidebar/search/SearchedRouteDetails";

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
    <>
      <SidebarViewsContainer>
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
              to={SITE_SUGGESTION_REDIREECT}
              target="_blank"
            >
              here.
            </Link>
          </span>
        </ViewWrapper>

        {showResults && segments && (
          <ResultsBottomSheet onClose={() => setShowResults(false)}>
            <Heading className="mb-4" level={2}>
              Follow the Route!
            </Heading>

            <SearchedRouteDetails
              mode="search"
              headingLevel={3}
              segments={segments}
            />
          </ResultsBottomSheet>
        )}
      </SidebarViewsContainer>

      <MapControlsContainer>
        {segments && (
          <>
            {segments?.map((segment, i) => (
              <RoutePolyLineRenderer
                key={`${segment.id}${i}`}
                stopIds={segment?.stops}
                fitToScreen={false}
                lineColor={segment?.lineColor}
                showDetailedPopup={false}
              />
            ))}
          </>
        )}

        {paramsStop && !segments && (
          <BusStopMarker
            stopId={paramsStop.id}
            stopName={paramsStop.name}
            position={[paramsStop.lat, paramsStop.lng]}
            lineColor="#bc2c36"
          />
        )}

        <FlyToStop />
      </MapControlsContainer>
    </>
  );
};

export default SearchPage;
