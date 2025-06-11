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
import type { ReactNode } from "react";
// import { useEffect, useState } from "react";

interface BaseMapLayerProps {
  children: ReactNode;
  className?: string;
}

const BaseMapLayer = ({ children, className }: BaseMapLayerProps) => {
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
  //     setMapCenter([parseFloat(lat), parseFloat(lon)]);
  //   } else {
  //     setMapCenter(MAP_CENTER);
  //   }
  // }, []);
  // if (!mapCenter) return null;

  return (
    <div className={`w-full h-full ${className}`}>
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

        {/* This is controlled by css to show and hide for mobile and desktop  */}
        <ZoomControl position="topleft" />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default BaseMapLayer;
