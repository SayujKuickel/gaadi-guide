import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MapSidebarLayout from "@/layout/MapSidebarLayout";
import HomePage from "@/pages/HomePage";
import RoutesPage from "@/pages/RoutesPage";

const ViewBusRoute = lazy(() => import("@/pages/bus/ViewBusRoute"));
const ViewAllBusRoutes = lazy(() => import("@/pages/bus/ViewAllBusRoutes"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const StopsPage = lazy(() => import("@/pages/StopsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AddNewRoute = lazy(() => import("@/pages/AddNewRoute"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App = () => {
  return (
    <Suspense
      fallback={
        <main className="grid w-full min-h-screen place-items-center">
          <div className="flex flex-col text-center items-center ">
            <img
              src="/favicon-96x96.png"
              width={100}
              height={100}
              alt="Loading logo"
              className="w-32 h-32 animate-in-fade  block"
            />
          </div>
        </main>
      }
    >
      <Routes>
        <Route element={<MapSidebarLayout />}>
          <Route index path="/" element={<HomePage />} />

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

        <Route path="/add-route" element={<AddNewRoute />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
