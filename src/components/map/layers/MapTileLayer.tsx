import { TileLayer } from "react-leaflet";
import {
  DEFAULT_MAP_TILE,
  tileLayerOptions,
} from "@/constants/tileLayerOptions";

interface MapTileLayerProps {
  tileMapKey: string;
}

const MapTileLayer: React.FC<MapTileLayerProps> = ({ tileMapKey }) => {
  const mapOverlayDetails =
    tileLayerOptions[tileMapKey] ?? tileLayerOptions[DEFAULT_MAP_TILE];

  return (
    <TileLayer
      url={mapOverlayDetails.url}
      attribution={mapOverlayDetails.attribution}
    />
  );
};

export default MapTileLayer;
