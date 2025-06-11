// \react
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// \data
import BusRoutes from "@/data/route_data.json";
import type { IRouteOption } from "@/types/routeOptions.types";

const useRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const routeId = searchParams.get("route");
    if (!routeId) return;

    const selRoute = BusRoutes.find((el) => el.id.toString() === routeId);
    if (selRoute) {
      setSelectedOption({ id: selRoute.id, name: selRoute.name });
    }
  }, [searchParams]);

  function handleRouteSelect(route: IRouteOption) {
    setSelectedOption(route);
    navigate(`/?route=${route.id}`);
  }

  return { selectedOption, handleRouteSelect };
};

export default useRoute;
