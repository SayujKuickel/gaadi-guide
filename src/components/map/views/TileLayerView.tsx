import { TileLayer } from "react-leaflet";
import {
  DEFAULT_MAP_TILE,
  tileLayerOptions,
} from "@/constants/tileLayerOptions";

interface TileLayerViewProps {
  tileMapKey: string;
}

const TileLayerView: React.FC<TileLayerViewProps> = ({ tileMapKey }) => {
  const mapOverlayDetails =
    tileLayerOptions[tileMapKey] ?? tileLayerOptions[DEFAULT_MAP_TILE];

  return (
    <TileLayer
      url={mapOverlayDetails.url}
      attribution={mapOverlayDetails.attribution}
    />
  );
};

export default TileLayerView;
