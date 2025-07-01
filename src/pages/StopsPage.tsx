// \hooks
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";

// \data
import stopsData from "@/data/stops_data.json";
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import Button from "@/components/common/Button";
import MapPageLayout from "@/layout/MapPageLayout";
import ShowLinesForStop from "@/components/sidebar/stops/ShowLinesForStop";

// \components
import ShowAllStops from "@/components/map/stop/ShowAllStops";
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import ResultsWrapper from "@/components/sidebar/wrappers/ResultsWrapper";

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
      <MapPageLayout
        sidebarContent={
          <>
            <ViewWrapper>
              <Heading className="mb-3" level={4}>
                Stops
              </Heading>

              <SearchableCombobox
                label="Select Stop"
                selected={selectedStop}
                onChange={(opt) => handleSetSelectedStop(opt)}
                options={stopsData.map((stp) => ({
                  id: stp.id,
                  name: stp.name,
                }))}
                placeholder="e.g. Ratopul Stop"
                className="mb-4"
              />

              <Button
                iconStyle={"fi fi-rr-search"}
                title={"Search"}
                ariaLabel="search"
                className="text-xs"
                onClick={handleShowResults}
              />
            </ViewWrapper>

            {showResults && (
              <ResultsWrapper onClose={() => setShowResults(false)}>
                <ShowLinesForStop filteredRoutes={filteredRoutes} />
              </ResultsWrapper>
            )}
          </>
        }
        mapContent={
          <>
            <ShowAllStops />
            <FlyToStop />
          </>
        }
      />
    </>
  );
};

export default StopsPage;
