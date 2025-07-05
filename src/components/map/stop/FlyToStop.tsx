import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMap } from "react-leaflet";
import { DEFAULT_FLY_TO_POSITION_ZOOM } from "@/constants/siteConfigs";
import type { IStop } from "@/types/stop.types";
import stops_data from "@/data/stops_data.json";

const FlyToStop = () => {
  const [searchParams] = useSearchParams();
  const stop = searchParams.get("stop");
  const map = useMap();

  useEffect(() => {
    if (!stop) return;

    const stopData = stops_data.find((item: IStop) => item.id === stop);

    if (!stopData) {
      console.info("[W] Invalid stop id found in url");
      return;
    }

    map.flyTo([stopData.lat, stopData.lng], DEFAULT_FLY_TO_POSITION_ZOOM);
  }, [stop, map]);

  return null;
};

export default FlyToStop;
