import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import PageLayout from "@/layout/PageLayout";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  return (
    <main>
      <PageLayout showBackBtn={false}>
        <Heading className="w-fit text-center mx-auto mt-18 mb-8" level={1}>
          Welcome to Kathmandu Bus Routes
        </Heading>

        <div className="flex items-center justify-center gap-2 ">
          <Link to={"/routes"}>
            <Button title="Routes" ariaLabel="Go to routes page" />
          </Link>

          <Link to={"/about"}>
            <Button title="About" ariaLabel="Go to About page" />
          </Link>

          <Link to={"/bus"}>
            <Button title="Details" ariaLabel="Go to Details page" />
          </Link>
        </div>
      </PageLayout>
    </main>
  );
};

export default HomePage;
