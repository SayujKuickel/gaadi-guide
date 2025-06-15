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
import UserLocationMarkerView from "@/components/map/views/UserLocationMarkerView";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import { useState } from "react";
import RouteView from "@/components/map/route/RouteView";

const Map = () => {
  const [searchParams] = useSearchParams();

  const [segments, setSegments] = useState(null);

  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();
  const { sideBarIndex, setSidebarIndex } = useSidebar();
  const { selectedRoute, handleRouteSelect, selectedStop, handleStopSelect } =
    useRoute();

  const fitRouteToWindow = checkIfNeedsTofit(searchParams);

  console.log(segments);
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
        <MapSidebar
          sideBarIndex={sideBarIndex}
          setSidebarIndex={setSidebarIndex}
        >
          {sideBarIndex === 0 && (
            <RoutesWrapper
              selectedRoute={selectedRoute}
              handleRouteSelect={handleRouteSelect}
              setSidebarIndex={setSidebarIndex}
            />
          )}

          {sideBarIndex === 1 && <SearchWrapper setSegments={setSegments} />}

          {sideBarIndex === 2 && (
            <ViewStopsWrapper
              selectedStop={selectedStop}
              handleStopSelect={handleStopSelect}
              setSidebarIndex={setSidebarIndex}
            />
          )}
        </MapSidebar>

        <BaseMapLayer className="relative pb-20 md:p-0 md:pl-20">
          <LayerView tileMapKey={tileMapKey} />

          <ShowRouteView fitRouteToWindow={fitRouteToWindow} />

          {userLocation && <UserLocationMarkerView position={userLocation} />}

          {/* {segments && (
            <>
              {segments?.segments?.map((segment) => (
                <>
                  <RouteView
                    stopIds={segment?.stops}
                    fitToScreen={false}
                    lineColor={segment?.lineColor}
                  />
                </>
              ))}
            </>
          )} */}
          <FlyToStop />
        </BaseMapLayer>
      </div>
    </>
  );
};

export default Map;
