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
    <section className="fixed inset-0 z-[999999] flex items-end md:relative md:w-85 md:pl-2 md:pt-2 ">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        onClick={onClose}
      />

      <div className="animate-slide-up-mobile relative w-full bg-surface rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden md:rounded-lg ">
        <div
          onClick={onClose}
          className="flex justify-center pt-3 pb-2 md:hidden"
        >
          <div className="w-10 h-1 bg-surface-3 rounded-full" />
        </div>

        <div className="px-4 py-2 border-b border-surface-2 md:hidden"></div>

        <div className="px-4 py-4 overflow-y-auto max-h-[70vh] md:max-h-96 no-scrollbar ">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ResultsWrapper;
