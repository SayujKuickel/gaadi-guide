import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { siteUrlMappings } from "./constants/siteConfigs";
import { MapPagesLayout, PageLayout } from "./components/layouts";

import HomePage from "@/pages/HomePage";
const RoutesPage = lazy(() => import("@/pages/RoutesPage"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const StopsPage = lazy(() => import("@/pages/StopsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AddNewRoutePage = lazy(() => import("@/pages/AddNewRoutePage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const BusRoutesPage = lazy(() => import("@/pages/bus/BusRoutesPage"));
const BusRouteDetailsPage = lazy(
  () => import("@/pages/bus/BusRouteDetailsPage")
);
const BusOperatorsPage = lazy(
  () => import("./pages/operators/BusOperatorsPage")
);
const BusOperatorDetailsPage = lazy(
  () => import("./pages/operators/BusOperatorDetailsPage")
);

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
        <Route element={<MapPagesLayout />}>
          <Route path={`/${siteUrlMappings.routes}`} element={<RoutesPage />} />
          <Route path={`/${siteUrlMappings.stops}`} element={<StopsPage />} />
          <Route path={`/${siteUrlMappings.search}`} element={<SearchPage />} />
        </Route>

        <Route element={<PageLayout />}>
          <Route
            index
            path={`/${siteUrlMappings.contact}`}
            element={<Contact />}
          />
          <Route index path={`/${siteUrlMappings.about}`} element={<About />} />

          <Route path={`/${siteUrlMappings.bus}`}>
            <Route index element={<BusRoutesPage />} />
            <Route path=":id" element={<BusRouteDetailsPage />} />
          </Route>

          <Route path={`/${siteUrlMappings.operators}`}>
            <Route index element={<BusOperatorsPage />} />
            <Route path=":name" element={<BusOperatorDetailsPage />} />
          </Route>

          <Route path="/add-route" element={<AddNewRoutePage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
