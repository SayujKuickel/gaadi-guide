import Button from "@/components/common/Button";
import { Minus, Plus } from "lucide-react";

interface ZoomControlHandlerProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControlHandler: React.FC<ZoomControlHandlerProps> = ({
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <aside className="fixed top-0 left-0 pl-2 pt-2 w-fit h-fit md:top-auto md:left-auto md:bottom-0 md:right-0 z-[1111] md:pl-0 md:pt-0 md:pr-2 md:pb-4">
      <Button
        ariaLabel="Zoom in to the map"
        className="rounded-b-none border-b-[1px]"
        icon={<Plus size={14} />}
        onClick={onZoomIn}
      />
      <Button
        ariaLabel="Zoom out of the map"
        className="rounded-t-none border-t-[1px]"
        icon={<Minus size={14} />}
        onClick={onZoomOut}
      />
    </aside>
  );
};

export default ZoomControlHandler;
