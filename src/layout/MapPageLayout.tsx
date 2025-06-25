import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import ZoomControlHandler from "@/components/map/controls/ZoomControlHandler/ZoomControlHandler";
import FlyToStop from "@/components/map/stop/FlyToStop";
import ZoomControlHandlerView from "@/components/map/views/ZoomControlHandlerView";
import MapSidebarContents from "@/components/containers/MapSidebarContainer";
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import React, { useState, useCallback, type ReactNode } from "react";

interface MapPageLayoutProps {
  sidebarContent: ReactNode;
  mapContent?: ReactNode;
  mapClassName?: string;
}

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

const MapPageLayout: React.FC<MapPageLayoutProps> = ({
  sidebarContent,
  mapContent,
  mapClassName = "relative pb-20 md:p-0 md:pl-20",
}) => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation, flyToPos } =
    useUserLocation();

  const [zoomFunctions, setZoomFunctions] = useState({
    zoomIn: () => console.log("Map not ready yet"),
    zoomOut: () => console.log("Map not ready yet"),
  });

  const handleZoomFunctionsReady = useCallback((functions: ZoomFunctions) => {
    setZoomFunctions(functions);
  }, []);

  return (
    <div className="flex-1 relative">
      <TopRightFixedContainer>
        <LayerSwitcher setTileMapKey={setTileMapKey} tileMapKey={tileMapKey} />
        <UserLocation
          isSearchingLocation={isSearchingLocation}
          getUserLocation={getUserLocation}
        />
      </TopRightFixedContainer>
      <ZoomControlHandler
        onZoomIn={zoomFunctions.zoomIn}
        onZoomOut={zoomFunctions.zoomOut}
      />
      <div className="w-full h-full relative">
        <MapSidebarContents>{sidebarContent}</MapSidebarContents>
        <BaseMapLayer
          tileMapKey={tileMapKey}
          userLocation={userLocation}
          flyToPos={flyToPos}
          className={mapClassName}
          onZoomFunctionsReady={handleZoomFunctionsReady}
        >
          {mapContent}

          <FlyToStop />
        </BaseMapLayer>
      </div>
    </div>
  );
};

export default MapPageLayout;
