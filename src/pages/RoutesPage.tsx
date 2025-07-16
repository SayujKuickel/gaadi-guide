// \react
import { useSearchParams } from "react-router-dom";
// /data
import route_data from "@/data/route_data.json";
// \hooks
import useRoute from "@/hooks/useSelectRoute";
// utils
import { checkIfNeedsTofit } from "@/utils/checkIfNeedsTofit";
// \components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import ViewWrapper from "@/components/sidebar/wrappers/SidebarPanel";
import RouteDetails from "@/components/sidebar/routes/RouteDetails";
import SelectedRoutePolylineView from "@/components/map/route/SelectedRoutePolylineView";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import MapControlsContainer from "@/components/containers/MapControlsContainer";
import SidebarViewsContainer from "@/components/containers/SidebarViewsContainer";
import ResultsBottomSheet from "@/components/sidebar/wrappers/ResultsBottomSheet";
import { Eye } from "lucide-react";

const RoutesPage = () => {
  const [searchParams] = useSearchParams();
  const { selectedRoute, handleRouteSelect, showResults, setShowResults } =
    useRoute();

  const handleShowResults = () => {
    if (!selectedRoute) return null;

    setShowResults(true);
  };

  const fitRouteToWindow = checkIfNeedsTofit(searchParams);

  return (
    <>
      <SidebarViewsContainer>
        <>
          <ViewWrapper>
            <Heading className="mb-3" level={2}>
              Routes
            </Heading>

            <SearchableCombobox
              label="Route"
              options={route_data.map((rt) => ({ id: rt.id, name: rt.name }))}
              selected={selectedRoute}
              onChange={(opt) => handleRouteSelect(opt)}
              placeholder="e.g. Ratna Park to Mangalbazar"
              className="mb-4"
            />

            {selectedRoute && !showResults && (
              <Button
                icon={<Eye size={16} />}
                title={"View Stops"}
                ariaLabel="search"
                className="text-xs"
                onClick={handleShowResults}
              />
            )}
          </ViewWrapper>

          {showResults && (
            <ResultsBottomSheet onClose={() => setShowResults(false)}>
              <RouteDetails />
            </ResultsBottomSheet>
          )}
        </>
      </SidebarViewsContainer>

      <MapControlsContainer>
        <SelectedRoutePolylineView fitRouteToWindow={fitRouteToWindow} />
      </MapControlsContainer>
    </>
  );
};

export default RoutesPage;
