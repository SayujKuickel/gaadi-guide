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
      <section className="px-2 pb-2 md:px-0 md:pb-0 md:pl-2 md:pt-2 w-full sm:w-85 ">
        <div className="px-4 py-3 bg-surface rounded-lg w-full relative">
          {children}

          <Button
            onClick={() => setIsShown(false)}
            ariaLabel="Close Sidebar View"
            iconStyle="fi fi-rr-cross-small"
            className="absolute -right-1 -top-1"
          />
        </div>
      </section>
    );

  return (
    <div className="px-2 pb-2 md:px-0 md:pb-0 md:pl-2 md:pt-2 w-fit">
      {hiddenBtn && <div onClick={() => setIsShown(true)}>{hiddenBtn}</div>}
    </div>
  );
};

export default ViewWrapper;
