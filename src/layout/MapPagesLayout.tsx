import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import FlyToStop from "@/components/map/stop/FlyToStop";
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import React, { type ReactNode } from "react";
import MapSidebarContents from "@/components/sidebar/MapSidebar";

interface MapPagesLayoutProps {
  sidebarContent: ReactNode;
  mapContent?: ReactNode;
  mapClassName?: string;
}

const MapPagesLayout: React.FC<MapPagesLayoutProps> = ({
  sidebarContent,
  mapContent,
  mapClassName = "relative pb-20 md:p-0 md:pl-20",
}) => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation, flyToPos } =
    useUserLocation();

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
        <MapSidebarContents>{sidebarContent}</MapSidebarContents>

        <BaseMapLayer
          tileMapKey={tileMapKey}
          userLocation={userLocation}
          flyToPos={flyToPos}
          className={mapClassName}
        >
          {mapContent}

          <FlyToStop />
        </BaseMapLayer>
      </div>
    </>
  );
};

export default MapPagesLayout;
