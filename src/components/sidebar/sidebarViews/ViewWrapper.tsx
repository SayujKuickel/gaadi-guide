import Button from "@/components/common/Button";
import type { ReactNode } from "react";

interface ViewWrapperProps {
  setSidebarIndex: (key: number) => void;
  children: ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({
  setSidebarIndex,
  children,
}) => {
  return (
    <>
      <div className="px-4 py-3 bg-surface rounded-lg w-full md:w-76 relative">
        <Button
          onClick={() => setSidebarIndex(-1)}
          ariaLabel="Close Sidebar View"
          iconStyle="fi fi-rr-cross-small"
          className="absolute -right-1 -top-1"
        />

        {children}
      </div>
    </>
  );
};

export default ViewWrapper;
