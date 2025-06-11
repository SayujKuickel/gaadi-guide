import { Route, Routes } from "react-router-dom";
import Map from "@/pages/Map";
import NotFound from "@/pages/NotFound";
import ViewBusRoute from "@/pages/bus/ViewBusRoute";
import ViewAllBusRoutes from "@/pages/bus/ViewAllBusRoutes";

const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<Map />} />
      <Route path="bus">
        <Route index element={<ViewAllBusRoutes />} />
        <Route path=":id" element={<ViewBusRoute />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
