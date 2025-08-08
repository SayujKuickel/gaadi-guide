import MapControlsContainer from "@/components/map/containers/MapControlsContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/ui/layerSwitcher/LayerSwitcher";
import UserLocation from "@/components/map/ui/UserLocation";
import ZoomControls from "@/components/map/ui/ZoomControls";
import FlyToStopHandler from "@/components/map/handers/FlyToStopHandler";
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import React, { useState, useCallback, type ReactNode } from "react";

interface MapRendererLayerProps {
  children: ReactNode;
}

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

const MapRendererLayer: React.FC<MapRendererLayerProps> = ({ children }) => {
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
      <MapControlsContainer>
        <LayerSwitcher setTileMapKey={setTileMapKey} tileMapKey={tileMapKey} />
        <UserLocation
          isSearchingLocation={isSearchingLocation}
          getUserLocation={getUserLocation}
        />
      </MapControlsContainer>

      <ZoomControls
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

        <FlyToStopHandler />
      </BaseMapLayer>
    </>
  );
};

export default MapRendererLayer;
