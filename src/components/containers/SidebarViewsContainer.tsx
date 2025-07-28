import { useEffect, useRef, type ReactNode } from "react";

interface SidebarViewsContainerProps {
  children: ReactNode;
}

const SidebarViewsContainer: React.FC<SidebarViewsContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const stopProp = (e: Event) => e.stopPropagation()

    const events = [
      "mousemove",
      "touchmove",
      "wheel",
      "dblclick",
    ] as const;

    for (const ev of events) {
      container.addEventListener(ev, stopProp)
    }
    return () => {
      for (const ev of events) {
        container.removeEventListener(ev, stopProp)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute z-[9999] bottom-0 left-0 md:top-0 md:left-0 w-full sm:w-fit h-fit"
    >
      {children}
    </div>
  );
};

export default SidebarViewsContainer;
