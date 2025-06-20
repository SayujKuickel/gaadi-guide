import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MapSidebarLayout from "@/layout/MapSidebarLayout";
import NotFound from "@/pages/NotFound";

const ViewBusRoute = lazy(() => import("@/pages/bus/ViewBusRoute"));
const ViewAllBusRoutes = lazy(() => import("@/pages/bus/ViewAllBusRoutes"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const RoutesPage = lazy(() => import("@/pages/RoutesPage"));
const StopsPage = lazy(() => import("@/pages/StopsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <main className="grid w-full min-h-screen  place-items-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </main>
      }
    >
      <Routes>
        <Route element={<MapSidebarLayout />}>
          <Route index path="/" element={<RoutesPage />} />

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
    </Suspense>
  );
};

export default App;
