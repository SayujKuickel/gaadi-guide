import { Link } from "react-router-dom";
// components
import Button from "@/components/common/Button";
import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/MapControls/LayerSwticher/LayerSwitcher";
import UserLocation from "@/components/map/MapControls/UserLocation/UserLocation";
// import ZoomControlHandler from "@/components/map/MapControls/ZoomControlHandler/ZoomControlHandler";
// import ZoomControlHandlerView from "@/components/map/MapControlViews/ZoomControlHandlerView";
import LayerView from "@/components/map/MapControlViews/TileLayerView";
import UserLocationMarkerView from "@/components/map/MapControlViews/UserLocationMarkerView";
// hooks
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import MapSidebar from "@/components/sidebar/MapSidebar";
import useSidebar from "@/hooks/useSidebar";
import RoutesWrapper from "@/components/sidebar/sidebarViews/RoutesWrapper";
import SearchWrapper from "@/components/sidebar/sidebarViews/SearchWrapper";
import ViewStopsWrapper from "@/components/sidebar/sidebarViews/ViewStopsWrapper";
import ShowRouteView from "@/components/map/route/ShowRouteView";

const Map = () => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();
  const { sideBarIndex, setSidebarIndex } = useSidebar();

  return (
    <>
      <TopRightFixedContainer>
        <Link to={"/bus"}>
          <Button
            iconStyle={`text-xl fi fi-rr-bus-alt`}
            ariaLabel="Navigate to bus routes"
          />
        </Link>

        <LayerSwitcher setTileMapKey={setTileMapKey} tileMapKey={tileMapKey} />

        <UserLocation
          isSearchingLocation={isSearchingLocation}
          getUserLocation={getUserLocation}
        />
      </TopRightFixedContainer>

      {/* <ZoomControlHandler /> */}

      <div className="w-screen h-screen overflow-hidden">
        <MapSidebar
          sideBarIndex={sideBarIndex}
          setSidebarIndex={setSidebarIndex}
        >
          {sideBarIndex == 0 && (
            <RoutesWrapper setSidebarIndex={setSidebarIndex} />
          )}
          {sideBarIndex == 1 && <SearchWrapper />}

          {sideBarIndex == 2 && (
            <ViewStopsWrapper setSidebarIndex={setSidebarIndex} />
          )}
        </MapSidebar>

        <BaseMapLayer className="relative pb-18 md:p-0 md:pl-20">
          <LayerView tileMapKey={tileMapKey} />

          <ShowRouteView />

          {userLocation && <UserLocationMarkerView position={userLocation} />}
          {/* <ZoomControlHandlerView /> */}
        </BaseMapLayer>
      </div>
    </>
  );
};

export default Map;
