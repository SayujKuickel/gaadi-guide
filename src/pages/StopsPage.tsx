// \hooks
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";
// \data
import stops_data from "@/data/stops_data.json";
// \components
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import Button from "@/components/common/Button";
import MapControlsContainer from "@/components/containers/MapControlsContainer";
import StopDetails from "@/components/sidebar/stops/StopDetails";
import ShowAllStops from "@/components/map/stop/ShowAllStops";
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import SidebarViewsContainer from "@/components/containers/SidebarViewsContainer";
import ResultsBottomSheet from "@/components/sidebar/wrappers/ResultsBottomSheet";
import { Eye } from "lucide-react";
import { Helmet } from "react-helmet";
import {
  SITE_BASE_TITLE,
  SITE_BASE_URL,
  siteUrlMappings,
} from "@/constants/siteConfigs";

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
          {selectedStop?.name ? `${selectedStop.name} Stop` : "Stops"} |{" "}
          {SITE_BASE_TITLE}
        </title>
        <link
          rel="canonical"
          href={`${SITE_BASE_URL}/${siteUrlMappings.stops}`}
        />
      </Helmet>

      <SidebarViewsContainer>
        <>
          <ViewWrapper>
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
          </ViewWrapper>

          {showResults && (
            <ResultsBottomSheet onClose={() => setShowResults(false)}>
              <StopDetails filteredRoutes={filteredRoutes} />
            </ResultsBottomSheet>
          )}
        </>
      </SidebarViewsContainer>

      <ShowAllStops />

      <FlyToStop />
    </>
  );
};

export default StopsPage;
