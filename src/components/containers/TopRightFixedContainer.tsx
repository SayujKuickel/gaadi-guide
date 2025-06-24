import { Link } from "react-router-dom";
import Button from "../common/Button";

const TopRightFixedContainer = ({ children }: any) => {
  return (
    <aside className="fixed right-0 top-0 pr-2 pt-2 z-[99999] flex flex-col justify-center items-center gap-2">
      {children}

      <Link to={"/bus"}>
        <Button
          className="text-xl"
          ariaLabel="Go to bus details page"
          iconStyle="fi fi-rr-track"
        />
      </Link>
    </aside>
  );
};

export default TopRightFixedContainer;
