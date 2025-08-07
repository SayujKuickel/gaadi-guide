import "leaflet/dist/leaflet.css";
import { LatLngBounds } from "leaflet";
import { MapContainer } from "react-leaflet";
import {
  MAP_BOUNDS_BOTTOM_RIGHT,
  MAP_BOUNDS_TOP_LEFT,
  DEFAULT_ZOOM,
  MAP_CENTER,
  MAX_ZOOM_OUT,
} from "@/constants/mapConfigs";
import React, { type ReactNode, memo } from "react";
import { UserLocationMarker } from "./ui";
import MapTileLayer from "./layers/MapTileLayer";
import ZoomControlsView from "./views/ZoomControlHandlerView";

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

interface BaseMapLayerStaticProps {
  userLocation: [number, number] | null;
  tileMapKey: string;
  flyToPos: boolean;
  onZoomFunctionsReady?: (functions: ZoomFunctions) => void;
  children?: ReactNode;
}

interface BaseMapLayerProps extends BaseMapLayerStaticProps {
  className?: string;
}

const BaseMapLayerStatic: React.FC<BaseMapLayerStaticProps> = memo(
  ({ tileMapKey, userLocation, flyToPos, onZoomFunctionsReady, children }) => (
    <MapContainer
      center={MAP_CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={MAX_ZOOM_OUT}
      zoomControl={false}
      maxBounds={new LatLngBounds(MAP_BOUNDS_TOP_LEFT, MAP_BOUNDS_BOTTOM_RIGHT)}
      maxBoundsViscosity={1.0}
      style={{ height: "100%", width: "100%", flex: "1" }}
    >
      {userLocation && (
        <UserLocationMarker flyToPos={flyToPos} position={userLocation} />
      )}

      <MapTileLayer tileMapKey={tileMapKey} />

      <ZoomControlsView onZoomFunctionsReady={onZoomFunctionsReady} />

      {children}
    </MapContainer>
  )
);

const BaseMapLayer: React.FC<BaseMapLayerProps> = ({ children, ...rest }) => (
  <BaseMapLayerStatic {...rest}>{children}</BaseMapLayerStatic>
);

export default BaseMapLayer;
