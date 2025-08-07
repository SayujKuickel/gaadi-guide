import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface ZoomFunctions {
  zoomIn: () => void;
  zoomOut: () => void;
}

interface ZoomControlsViewProps {
  onZoomFunctionsReady?: (functions: ZoomFunctions) => void;
}

const ZoomControlsView: React.FC<ZoomControlsViewProps> = ({
  onZoomFunctionsReady,
}) => {
  const map = useMap();

  const handleZoomIn = () => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom + 1);
  };

  const handleZoomOut = () => {
    const currentZoom = map.getZoom();
    map.setZoom(currentZoom - 1);
  };

  useEffect(() => {
    if (map && onZoomFunctionsReady) {
      onZoomFunctionsReady({
        zoomIn: handleZoomIn,
        zoomOut: handleZoomOut,
      });
    }
  }, [map, onZoomFunctionsReady]);

  return null;
};

export default ZoomControlsView;
