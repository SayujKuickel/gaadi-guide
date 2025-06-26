import Button from "@/components/common/Button";
import Footer from "@/components/common/global/Footer";
import Header from "@/components/common/global/Header";
import { Link } from "react-router-dom";

interface NotFoundProps {
  title?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  return (
    <div className="my-64">
      <h1 className="heading-1 text-center font-extrabold mb-6">
        {title ? title : "Page not Found!"}
      </h1>

      <div className="flex items-center justify-center gap-4">
        <Link to={"/"}>
          <Button
            iconStyle={"fi fi-rr-map"}
            ariaLabel="Go to map page"
            title={"Map"}
            className={"mx-auto"}
          />
        </Link>

        <Link to={"/bus"}>
          <Button
            ariaLabel="Go to bus routes page"
            iconStyle="fi fi-rr-track"
            title={"Bus Routes"}
            className={"mx-auto"}
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
