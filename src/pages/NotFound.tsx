import Button from "@/components/common/Button";
import { Link } from "react-router-dom";

interface NotFoundProps {
  title?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title }) => {
  return (
    <main className="bg-background text-text min-h-screen">
      {/* <Header /> */}

      <div className="my-64">
        <h1 className="heading-1 text-center font-extrabold mb-6">
          {title ? title : "Page not Found!"}
        </h1>

        <div className="flex items-center justify-center gap-4">
          <Link to={"/"}>
            <Button
              iconStyle={"fi fi-rr-map"}
              title={"Map"}
              className={"mx-auto"}
            />
          </Link>

          <Link to={"/bus"}>
            <Button
              iconStyle="fi fi-rr-track"
              title={"Bus Routes"}
              className={"mx-auto"}
            />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
