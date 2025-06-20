// \hooks
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";

// \data
import stopsData from "@/data/stops_data.json";
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import Button from "@/components/common/Button";
import MapPagesLayout from "@/layout/MapPagesLayout";
import ShowLinesForStop from "@/components/sidebar/sidebarViews/ShowLinesForStop";

// \components
import ShowAllStops from "@/components/map/stop/ShowAllStops";
import ViewWrapper from "@/components/sidebar/sidebarViews/ViewWrapper";
import SearchableCombobox from "@/components/common/SearchableCombobox";

const StopsPage = () => {
  const {
    selectedStop,
    setSelectedStop,
    handlSsetSelectedStop,
    filteredRoutes,
  } = useFilterRoutesBySearch();

  if (!filteredRoutes) return null;

  return (
    <>
      <MapPagesLayout
        sidebarContent={
          <>
            <ViewWrapper
              hiddenBtn={
                <Button
                  ariaLabel="Show search stops modal"
                  iconStyle="fi fi-rr-land-layer-location"
                />
              }
            >
              <Heading className="mb-3" level={4}>
                Search Stops
              </Heading>

              <SearchableCombobox
                label="Select Stop"
                selected={selectedStop}
                onChange={(opt) => handlSsetSelectedStop(opt)}
                options={stopsData.map((stp) => ({
                  id: stp.id,
                  name: stp.name,
                }))}
                placeholder="Ratopul stop"
              />
            </ViewWrapper>

            {selectedStop?.id && (
              <ViewWrapper
                hiddenBtn={
                  <Button ariaLabel="show modal" iconStyle="fi fi-rr-eye" />
                }
              >
                <ShowLinesForStop filteredRoutes={filteredRoutes} />
              </ViewWrapper>
            )}
          </>
        }
        mapContent={
          <>
            {" "}
            <ShowAllStops />
            <FlyToStop />
          </>
        }
      />
    </>
  );
};

export default StopsPage;
