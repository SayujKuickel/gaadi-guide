import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import ZoomControlHandler from "@/components/map/controls/ZoomControlHandler/ZoomControlHandler";
import FlyToStop from "@/components/map/stop/FlyToStop";
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import React, { useState, useCallback, type ReactNode } from "react";

interface MapControlsContainerProps {
  children: ReactNode;
}

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

const MapControlsContainer: React.FC<MapControlsContainerProps> = ({
  children,
}) => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation, flyToPos } =
    useUserLocation();

  const [zoomFunctions, setZoomFunctions] = useState({
    zoomIn: () => console.warn("Map not ready yet"),
    zoomOut: () => console.warn("Map not ready yet"),
  });

  const handleZoomFunctionsReady = useCallback((functions: ZoomFunctions) => {
    setZoomFunctions(functions);
  }, []);

  return (
    <>
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

      <BaseMapLayer
        tileMapKey={tileMapKey}
        userLocation={userLocation}
        flyToPos={flyToPos}
        onZoomFunctionsReady={handleZoomFunctionsReady}
      >
        {children}

        <FlyToStop />
      </BaseMapLayer>
    </>
  );
};

export default MapControlsContainer;
