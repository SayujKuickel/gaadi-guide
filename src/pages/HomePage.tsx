import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  return null;
};

export default HomePage;
