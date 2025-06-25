import "leaflet/dist/leaflet.css";
import { LatLngBounds } from "leaflet";
import { MapContainer, ZoomControl } from "react-leaflet";
import {
  MAP_BOUNDS_BOTTOM_RIGHT,
  MAP_BOUNDS_TOP_LEFT,
  DEFAULT_ZOOM,
  MAP_CENTER,
  MAX_ZOOM_OUT,
} from "@/constants/mapSettings";
import { useEffect, useState, type ReactNode } from "react";
import TileLayerView from "./views/TileLayerView";
import UserLocationMarkerView from "./views/UserLocationMarkerView";
import ZoomControlHandlerView from "./views/ZoomControlHandlerView";
// import { useEffect, useState } from "react";

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

interface BaseMapLayerProps {
  children: ReactNode;
  className?: string;
  userLocation: [number, number] | null;
  tileMapKey: string;
  flyToPos: boolean;
  onZoomFunctionsReady?: (functions: ZoomFunctions) => void;
}

const BaseMapLayer = ({
  tileMapKey,
  children,
  className,
  flyToPos,
  userLocation,
  onZoomFunctionsReady,
}: BaseMapLayerProps) => {
  /* 
  Uncomment this to fix the map to the user position if the user location is 
  stored in the sesssion
  also need to use the setter's variable mapCenter -> center={MAP_CENTER} here
  */

  // const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  // useEffect(() => {
  //   const lat = sessionStorage.getItem("user-latitude");
  //   const lon = sessionStorage.getItem("user-longitude");
  //   if (lat !== null && lon !== null) {
  //     setTimeout(() => {
  //       setMapCenter([parseFloat(lat), parseFloat(lon)]);
  //     }, 1000);
  //   } else {
  //     setMapCenter(MAP_CENTER);
  //   }
  // }, []);

  // if (!mapCenter)
  //   return (
  //     <div className="grid place-items-center w-full h-full">Loading map</div>
  //   );

  return (
    <>
      <MapContainer
        center={MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MAX_ZOOM_OUT}
        zoomControl={false}
        maxBounds={
          new LatLngBounds(MAP_BOUNDS_TOP_LEFT, MAP_BOUNDS_BOTTOM_RIGHT)
        }
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >
        {children}

        {/* shows User location marker */}
        {userLocation && (
          <UserLocationMarkerView flyToPos={flyToPos} position={userLocation} />
        )}

        {/* Toggles between different layers */}
        <TileLayerView tileMapKey={tileMapKey} />

        <ZoomControlHandlerView onZoomFunctionsReady={onZoomFunctionsReady} />
      </MapContainer>
    </>
  );
};

export default BaseMapLayer;
