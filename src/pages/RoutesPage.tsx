// \react
import { Link, useSearchParams } from "react-router-dom";
// \hooks
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import useSidebar from "@/hooks/useSidebar";
import useRoute from "@/hooks/useSelectRoute";
// \utils
import { checkIfNeedsTofit } from "@/utils/checkIfNeedsTofit";
// \components
import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import LayerView from "@/components/map/views/TileLayerView";
import MapSidebar from "@/components/sidebar/MapSidebar";
import RoutesWrapper from "@/components/sidebar/sidebarViews/RoutesWrapper";
import SearchWrapper from "@/components/sidebar/sidebarViews/SearchWrapper";
import ViewStopsWrapper from "@/components/sidebar/sidebarViews/ViewStopsWrapper";
import ShowRouteView from "@/components/map/route/ShowRouteView";
import FlyToStop from "@/components/map/stop/FlyToStop";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import { useState } from "react";
import RouteView from "@/components/map/route/RouteView";
import { type IRouteSegment } from "@/utils/searchRouteSegments";
import ViewWrapper from "@/components/sidebar/sidebarViews/ViewWrapper";
import ViewSearchedStops from "@/components/sidebar/sidebarViews/ViewSearchedStops";
import Button from "@/components/common/Button";

const RoutesPage = () => {
  const [searchParams] = useSearchParams();

  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();

  const { selectedRoute, handleRouteSelect, selectedStop, handleStopSelect } =
    useRoute();

  const fitRouteToWindow = checkIfNeedsTofit(searchParams);

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
          <ViewWrapper
            hiddenBtn={
              <Button iconStyle="fi fi-rr-car-journey" ariaLabel="show route" />
            }
          >
            <RoutesWrapper
              selectedRoute={selectedRoute}
              handleRouteSelect={handleRouteSelect}
            />
          </ViewWrapper>

          {selectedRoute && (
            <ViewWrapper
              hiddenBtn={
                <Button
                  iconStyle="fi fi-rr-land-layer-location"
                  ariaLabel="show route"
                />
              }
            >
              <ViewStopsWrapper />
            </ViewWrapper>
          )}
        </MapSidebar>

        <BaseMapLayer
          tileMapKey={tileMapKey}
          userLocation={userLocation}
          className="relative pb-20 md:p-0 md:pl-20"
        >
          <ShowRouteView fitRouteToWindow={fitRouteToWindow} />

          <FlyToStop />
        </BaseMapLayer>
      </div>
    </>
  );
};

export default RoutesPage;
