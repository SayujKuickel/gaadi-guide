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
import { Heading, ResultsBottomSheet, ViewWrapper } from "@/components/ui";
import { BusStopMarker } from "@/components/map/ui";
import { SidebarLayout } from "@/components/layouts";
import {
  SearchForm,
  SearchRouteSegmentsList,
} from "@/components/features/search";
import MapRendererLayer from "@/components/map/MapRendererLayer";
import { RouteRenderer } from "@/components/map/renderer";
import { FlyToStopHandler } from "@/components/map/handers";

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

      <SidebarLayout>
        <ViewWrapper>
          <SearchForm
            setShowResults={setShowResults}
            setSegments={setSegments}
          />
        </ViewWrapper>

        {showResults && segments && (
          <ResultsBottomSheet onClose={() => setShowResults(false)}>
            <Heading className="mb-4" level={2}>
              Follow the Route!
            </Heading>

            <SearchRouteSegmentsList
              mode="search"
              headingLevel={3}
              segments={segments}
            />
          </ResultsBottomSheet>
        )}
      </SidebarLayout>

      <MapRendererLayer>
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

        <FlyToStopHandler />
      </MapRendererLayer>
    </>
  );
};

export default SearchPage;
