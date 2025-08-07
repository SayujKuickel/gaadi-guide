import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// \data
import stops_data from "@/data/stops_data.json";
// \types
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import type { IStop } from "@/types/stop.types";
// \settings
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
// \components
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import FlyToStop from "@/components/map/stop/FlyToStop";
import SearchWrapper from "@/components/sidebar/search/SearchWrapper";
import MapControlsContainer from "@/components/containers/MapControlsContainer";
import SidebarViewsContainer from "@/components/containers/SidebarViewsContainer";
import RouteRenderer from "@/components/map/route/RouteRenderer";
import ResultsBottomSheet from "@/components/sidebar/wrappers/ResultsBottomSheet";
import SearchedRouteDetails from "@/components/sidebar/search/SearchedRouteDetails";
import { Heading } from "@/components/ui";
import { BusStopMarker } from "@/components/map/ui";

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
      <Helmet>
        <title>Search {SITE_TOP_TITLE}</title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.search}`}
        />
      </Helmet>

      <SidebarViewsContainer>
        <ViewWrapper>
          <SearchWrapper
            setShowResults={setShowResults}
            setSegments={setSegments}
          />
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
              <RouteRenderer
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
