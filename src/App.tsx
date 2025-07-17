import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "@/pages/HomePage";
import RoutesPage from "@/pages/RoutesPage";
import MapPagesLayout from "@/layout/MapPagesLayout";
import BusOperatorsPage from "./pages/operators/BusOperatorsPage";
import BusOperatorDetailsPage from "./pages/operators/BusOperatorDetailsPage";
import { siteUrlMappings } from "./constants/siteConfigs";

const PageLayout = lazy(() => import("@/layout/PageLayout"));
const BusRouteDetailsPage = lazy(
  () => import("@/pages/bus/BusRouteDetailsPage")
);
const BusRoutesPage = lazy(() => import("@/pages/bus/BusRoutesPage"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const StopsPage = lazy(() => import("@/pages/StopsPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AddNewRoutePage = lazy(() => import("@/pages/AddNewRoutePage"));
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
        <Route element={<MapPagesLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path={`/${siteUrlMappings.routes}`} element={<RoutesPage />} />
          <Route path={`/${siteUrlMappings.stops}`} element={<StopsPage />} />
          <Route path={`/${siteUrlMappings.search}`} element={<SearchPage />} />
        </Route>

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

        <Route
          path="*"
          element={
            <PageLayout>
              <NotFound />
            </PageLayout>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
