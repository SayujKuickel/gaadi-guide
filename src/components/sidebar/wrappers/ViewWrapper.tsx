import { type ReactNode } from "react";

interface ViewWrapperProps {
  children: ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({ children }) => {
  return (
    <section className="px-2 pb-2 md:px-0 md:pb-0 md:pl-2 md:pt-2 w-full sm:w-85">
      <div className="px-4 py-3 bg-surface rounded-lg w-full relative">
        {children}
      </div>
    </section>
  );
};

export default ViewWrapper;
