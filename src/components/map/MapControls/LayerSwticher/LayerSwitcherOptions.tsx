import { tileLayerOptions } from "@/constants/tileLayerOptions";

interface LayerToggleOptionsProps {
  setTileMapKey: (key: string) => void;
  tileMapKey: string;
}

const LayerToggleOptions: React.FC<LayerToggleOptionsProps> = ({
  setTileMapKey,
  tileMapKey,
}) => {
  return (
    <ul className="space-y-2">
      {Object.keys(tileLayerOptions).map((item) => {
        const { icon, name, mapTypeLabel } = tileLayerOptions[item];
        return (
          <li
            key={item}
            className={`bg-surface-1 flex items-center gap-2 p-2 rounded-lg outline-2 cursor-pointer transition-colors ${
              item === tileMapKey ? "outline-green-800" : "outline-transparent"
            }`}
            onClick={() => setTileMapKey(item)}
          >
            <img
              className="w-12 rounded-lg aspect-square object-cover"
              src={icon}
              alt={name}
            />

            <div>
              <p className="capitalize text-sm font-bold -mb-1">
                {mapTypeLabel}
              </p>

              <span className="capitalize text-xs">{name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LayerToggleOptions;
