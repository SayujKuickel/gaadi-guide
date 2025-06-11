import { useState } from "react";
import Button from "@/components/common/Button";
import LayerToggleOptions from "./LayerSwitcherOptions";

interface LayerSwitcherProps {
  setTileMapKey: (key: string) => void;
  tileMapKey: string;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  setTileMapKey,
  tileMapKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative">
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        iconStyle="text-xl fi fi-rr-layers"
        ariaLabel="Toggle map layers"
      />

      {isOpen && (
        <div className="absolute bg-surface top-0 right-full -translate-x-2 text-text px-2 py-3 rounded-lg w-48 shadow-lg z-50">
          <h3 className="text-lg mb-4">Select Theme</h3>

          <LayerToggleOptions
            setTileMapKey={setTileMapKey}
            tileMapKey={tileMapKey}
          />
        </div>
      )}
    </section>
  );
};

export default LayerSwitcher;
