// \hooks
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
// \components
import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import MapSidebar from "@/components/sidebar/MapSidebar";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import ShowAllStops from "@/components/map/stop/ShowAllStops";
import ViewWrapper from "@/components/sidebar/sidebarViews/ViewWrapper";
import SearchableCombobox from "@/components/common/SearchableCombobox";
// \data
import stopsData from "@/data/stops_data.json";
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import { useState } from "react";
import type { IRouteSegment } from "@/utils/searchRouteSegments";
import SearchWrapper from "@/components/sidebar/sidebarViews/SearchWrapper";
import ViewSearchedStops from "@/components/sidebar/sidebarViews/ViewSearchedStops";
import Button from "@/components/common/Button";
import RouteView from "@/components/map/route/RouteView";

const SearchPage = () => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();

  const [segments, setSegments] = useState<IRouteSegment[] | null>(null);

  return (
    <>
      <TopRightFixedContainer>
        <LayerSwitcher setTileMapKey={setTileMapKey} tileMapKey={tileMapKey} />

        <UserLocation
          isSearchingLocation={isSearchingLocation}
          getUserLocation={getUserLocation}
        />
      </TopRightFixedContainer>

      <div className="w-screen h-screen overflow-hidden">
        <MapSidebar>
          <div className="flex flex-col gap-2">
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
          </div>
        </MapSidebar>

        <BaseMapLayer
          tileMapKey={tileMapKey}
          userLocation={userLocation}
          className="relative pb-20 md:p-0 md:pl-20"
        >
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
        </BaseMapLayer>
      </div>
    </>
  );
};

export default SearchPage;
