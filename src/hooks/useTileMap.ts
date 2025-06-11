import { useEffect, useState } from "react";
import {
  DEFAULT_MAP_TILE,
  tileLayerOptions,
} from "@/constants/tileLayerOptions";

export type TileMapKey = keyof typeof tileLayerOptions;

const useTileMap = () => {
  const [tileMap, setTileMap] = useState<TileMapKey>(DEFAULT_MAP_TILE);

  useEffect(() => {
    const storedKey = localStorage.getItem("tileMapKey");

    if (storedKey && storedKey in tileLayerOptions) {
      setTileMap(storedKey as TileMapKey);
    }
  }, []);

  const setTileMapKey = (key: string) => {
    if (!(key in tileLayerOptions)) {
      console.warn("[w] Selected key not found!");
      return;
    }

    localStorage.setItem("tileMapKey", key);
    setTileMap(key as TileMapKey);
  };

  return { tileMap, setTileMapKey };
};

export default useTileMap;
