import { siteUrlMappings } from "@/constants/siteConfigs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${siteUrlMappings.routes}`, { replace: true });
  }, [navigate]);

  return null;
};

export default HomePage;
