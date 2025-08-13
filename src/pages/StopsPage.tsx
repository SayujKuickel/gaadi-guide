// \hooks
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";
// \data
import stops_data from "@/data/stops_data.json";
// \components
import FlyToStopHandler from "@/components/map/handers/FlyToStopHandler";
import AllStopsLayer from "@/components/map/layers/AllStopsLayer";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { Eye, Map } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  SITE_TOP_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";
import {
  BottomSheet,
  Button,
  ContentPanel,
  Heading,
  LineHeading,
  SearchableCombobox,
} from "@/components/ui";
import { Link } from "react-router-dom";
import MapRendererLayer from "@/components/map/MapRendererLayer";

const StopsPage = () => {
  const {
    selectedStop,
    handleSetSelectedStop,
    filteredRoutes,
    showResults,
    setShowResults,
  } = useFilterRoutesBySearch();

  function handleShowResults() {
    if (!selectedStop || !selectedStop.id) return null;

    setShowResults(true);
  }

  return (
    <>
      <Helmet>
        <title>
          {selectedStop?.name ? `${selectedStop.name} Stop` : "Stops"}
          {SITE_TOP_TITLE}
        </title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.stops}`}
        />
      </Helmet>

      <SidebarLayout>
        <>
          <ContentPanel>
            <Heading className="mb-3" level={2}>
              Stops
            </Heading>

            <SearchableCombobox
              label="Select Stop"
              selected={selectedStop}
              onChange={(opt) => handleSetSelectedStop(opt)}
              options={stops_data.map((stp) => ({
                id: stp.id,
                name: stp.name,
              }))}
              placeholder="e.g. Ratopul Stop"
              className="mb-4"
            />

            {selectedStop && !showResults && (
              <Button
                icon={<Eye size={16} />}
                title={"View Routes"}
                ariaLabel="View Routes"
                className="text-xs text-on-surface font-[600]"
                onClick={handleShowResults}
              />
            )}
          </ContentPanel>

          {showResults && (
            <BottomSheet onClose={() => setShowResults(false)}>
              <div className="">
                <Heading className="mb-3" level={2}>
                  Routes for this stop.
                </Heading>

                <ul className="overflow-auto scrollbar-sa">
                  {filteredRoutes?.map((route, i) => (
                    <li
                      key={i}
                      className="border-y border-y-surface-3/75 hover:bg-surface-3/25 first:border-t-0 last:border-b-0"
                    >
                      <Link
                        className="w-full h-full block py-2 sm:flex sm:items-center sm:justify-between"
                        to={`/${siteUrlMappings.routes}?route=${route.id}`}
                      >
                        <LineHeading
                          name={route.name}
                          lineColor={route.lineColor}
                          level={5}
                          className=""
                        />

                        <Button
                          title="View"
                          icon={<Map size={16} />}
                          className="text-xs mt-2 md:hidden sm:mt-0"
                          ariaLabel={`View ${route.name} in its own page`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </BottomSheet>
          )}
        </>
      </SidebarLayout>

      <MapRendererLayer>
        <AllStopsLayer />

        <FlyToStopHandler />
      </MapRendererLayer>
    </>
  );
};

export default StopsPage;
