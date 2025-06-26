import type { ReactNode } from "react";

interface ResultsWrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

const ResultsWrapper: React.FC<ResultsWrapperProps> = ({
  children,
  onClose,
}) => {
  return (
    <section className="fixed inset-0 z-[99999] flex items-end md:relative md:w-85 md:pl-2 md:pt-2 ">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300 md:hidden"
        onClick={onClose}
      />

      <div className="animate-slide-up-mobile relative w-full bg-surface rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden md:rounded-lg ">
        <div
          onClick={onClose}
          className="grid place-items-center py-3 md:hidden border-b border-b-surface-2"
        >
          <div className="w-10 h-1 bg-surface-3 rounded-full" />

          {/* {title && (
            <span className="text-xs font-semibold mt-2 text-offText/95">
              {title}
            </span>
          )} */}
        </div>

        <div className="px-4 py-4 overflow-y-auto max-h-[70vh] md:max-h-96 no-scrollbar">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ResultsWrapper;
