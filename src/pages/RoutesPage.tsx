// \react
import { useSearchParams } from "react-router-dom";
// /data
import route_data from "@/data/route_data.json";
// \hooks
import useRoute from "@/hooks/useSelectRoute";
// utils
import { checkIfNeedsTofit } from "@/utils/checkIfNeedsTofit";
//
import { Helmet } from "react-helmet";
// \components
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import RouteDetails from "@/components/sidebar/routes/RouteDetails";
import SelectedRoutePolylineView from "@/components/map/route/SelectedRoutePolylineView";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import MapControlsContainer from "@/components/containers/MapControlsContainer";
import SidebarViewsContainer from "@/components/containers/SidebarViewsContainer";
import ResultsBottomSheet from "@/components/sidebar/wrappers/ResultsBottomSheet";
// icons
import { Eye } from "lucide-react";
import { SITE_BASE_TITLE, SITE_BASE_URL } from "@/constants/siteConfigs";

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
      <Helmet>
        <title>
          {selectedRoute?.name ? selectedRoute.name : "Routes"} |{" "}
          {SITE_BASE_TITLE}
        </title>
        <link rel="canonical" href={`${SITE_BASE_URL}/routes`} />
      </Helmet>

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
                className="text-xs text-on-surface font-[600]"
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

      <SelectedRoutePolylineView fitRouteToWindow={fitRouteToWindow} />
    </>
  );
};

export default RoutesPage;
