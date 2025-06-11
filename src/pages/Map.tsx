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
import Button from "@/components/common/Button";
import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/MapControls/LayerSwticher/LayerSwitcher";
import LayerView from "@/components/map/MapControlViews/TileLayerView";
import MapSidebar from "@/components/sidebar/MapSidebar";
import RoutesWrapper from "@/components/sidebar/sidebarViews/RoutesWrapper";
import SearchWrapper from "@/components/sidebar/sidebarViews/SearchWrapper";
import ViewStopsWrapper from "@/components/sidebar/sidebarViews/ViewStopsWrapper";
import ShowRouteView from "@/components/map/route/ShowRouteView";
import FlyToStop from "@/components/map/stop/FlyToStop";
import UserLocationMarkerView from "@/components/map/MapControlViews/UserLocationMarkerView";
import UserLocation from "@/components/map/MapControls/UserLocation/UserLocation";

const Map = () => {
  const [searchParams] = useSearchParams();

  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();
  const { sideBarIndex, setSidebarIndex } = useSidebar();
  const { selectedRoute, handleRouteSelect, selectedStop, handleStopSelect } =
    useRoute();

  const fitRouteToWindow = checkIfNeedsTofit(searchParams);
  return (
    <>
      <TopRightFixedContainer>
        <Link to="/bus">
          <Button
            iconStyle="text-xl fi fi-rr-bus-alt"
            ariaLabel="Navigate to bus routes"
          />
        </Link>

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

          {sideBarIndex === 1 && <SearchWrapper />}

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

          <FlyToStop />
        </BaseMapLayer>
      </div>
    </>
  );
};

export default Map;
