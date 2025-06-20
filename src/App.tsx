import { Route, Routes } from "react-router-dom";
import MapSidebarLayout from "@/layout/MapSidebarLayout";
import NotFound from "@/pages/NotFound";
import ViewBusRoute from "@/pages/bus/ViewBusRoute";
import ViewAllBusRoutes from "@/pages/bus/ViewAllBusRoutes";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import RoutesPage from "@/pages/RoutesPage";
import StopsPage from "@/pages/StopsPage";
import SearchPage from "@/pages/SearchPage";
import HomePage from "@/pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />

      <Route element={<MapSidebarLayout />}>
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/stops" element={<StopsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>

      <Route index path="/contact" element={<Contact />} />
      <Route index path="/about" element={<About />} />

      <Route path="bus">
        <Route index element={<ViewAllBusRoutes />} />
        <Route path=":id" element={<ViewBusRoute />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
