import React, { useRef, useState } from "react";

interface ResultsBottomSheetProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const ResultsBottomSheet: React.FC<ResultsBottomSheetProps> = ({
  children,
  onClose,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const currentY = useRef(0);
  const dragging = useRef(false);
  const [translateY, setTranslateY] = useState(0);

  const THRESHOLD = 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    startY.current = e.touches[0].clientY;
    dragging.current = true;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
    dragging.current = true;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current || startY.current === null) return;
    const deltaY = e.touches[0].clientY - startY.current;
    if (deltaY < 0) return;
    setTranslateY(deltaY);
    currentY.current = deltaY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current || startY.current === null) return;
    const deltaY = e.clientY - startY.current;
    if (deltaY < 0) return;
    setTranslateY(deltaY);
    currentY.current = deltaY;
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    if (currentY.current > THRESHOLD) {
      onClose?.();
    } else {
      setTranslateY(0);
    }
    startY.current = null;
    currentY.current = 0;
  };

  const handleMouseUp = () => {
    dragging.current = false;
    if (currentY.current > THRESHOLD) {
      onClose?.();
    } else {
      setTranslateY(0);
    }
    startY.current = null;
    currentY.current = 0;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <section className="fixed inset-0 z-[99999] flex items-end md:relative md:w-85 md:pl-2 md:pt-2 ">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px] transition-opacity duration-300 md:hidden"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      />

      <div
        ref={sheetRef}
        style={{ transform: `translateY(${translateY}px)` }}
        className="animate-slide-up-mobile relative w-full bg-surface rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden md:rounded-lg"
      >
        <div
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          style={{ touchAction: "none" }}
          className="grid place-items-center py-3 md:hidden border-b border-b-surface-2 cursor-grab"
        >
          <div className="w-10 h-1 bg-surface-3 rounded-full" />
        </div>

        <div className="px-4 py-4 overflow-y-auto max-h-[70vh] md:max-h-96 no-scrollbar">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ResultsBottomSheet;
