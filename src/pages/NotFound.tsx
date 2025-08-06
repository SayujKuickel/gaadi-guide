import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { Map, Route } from "lucide-react";
import { siteUrlMappings } from "@/constants/siteConfigs";

interface NotFoundProps {
  title?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  return (
    <>
      <div className="my-64">
        <h1 className="heading-1 text-center font-extrabold mb-6">
          {title ? title : "Page not Found!"}
        </h1>

        <div className="flex items-center justify-center gap-4">
          <Link to={"/"}>
            <Button
              icon={<Map size={18} />}
              ariaLabel="Go to map page"
              title={"Map"}
              className={"mx-auto"}
            />
          </Link>

          <Link to={`/${siteUrlMappings.bus}`}>
            <Button
              ariaLabel="Go to bus routes page"
              icon={<Route size={18} />}
              title={"Bus Routes"}
              className={"mx-auto"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
