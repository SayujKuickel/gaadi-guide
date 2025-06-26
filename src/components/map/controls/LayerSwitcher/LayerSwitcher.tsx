import { useState, useEffect, useRef } from "react";
import Button from "@/components/common/Button";
import LayerToggleOptions from "./LayerSwitcherOptions";
import Heading from "@/components/common/Heading";

interface LayerSwitcherProps {
  setTileMapKey: (key: string) => void;
  tileMapKey: string;
}

const LayerSwitcher: React.FC<LayerSwitcherProps> = ({
  setTileMapKey,
  tileMapKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="relative" ref={containerRef}>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        iconStyle="text-xl fi fi-rr-layers"
        ariaLabel="Toggle map layers"
      />

      {isOpen && (
        <div className="absolute bg-surface top-0 right-full -translate-x-2 text-text px-4 py-3 rounded-lg w-52 shadow-lg z-[1111]">
          <Heading level={4} className="mb-4">
            Select Theme
          </Heading>

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
