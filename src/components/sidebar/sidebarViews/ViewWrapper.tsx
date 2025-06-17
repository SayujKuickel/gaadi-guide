import Button from "@/components/common/Button";
import { useState, type ReactNode } from "react";

interface ViewWrapperProps {
  children: ReactNode;
  hiddenBtn?: ReactNode;
}

const ViewWrapper: React.FC<ViewWrapperProps> = ({ children, hiddenBtn }) => {
  const [isShown, setIsShown] = useState<boolean>(true);

  if (isShown)
    return (
      <>
        <div className="px-4 py-3 bg-surface rounded-lg w-full md:w-76 relative">
          <Button
            onClick={() => setIsShown(false)}
            ariaLabel="Close Sidebar View"
            iconStyle="fi fi-rr-cross-small"
            className="absolute -right-1 -top-1"
          />

          {children}
        </div>
      </>
    );

  return (
    <>{hiddenBtn && <div onClick={() => setIsShown(true)}>{hiddenBtn}</div>}</>
  );
};

export default ViewWrapper;
