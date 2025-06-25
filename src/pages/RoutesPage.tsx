import { useSearchParams } from "react-router-dom";
import useRoute from "@/hooks/useSelectRoute";
import { checkIfNeedsTofit } from "@/utils/checkIfNeedsTofit";
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import ViewStopsWrapper from "@/components/sidebar/stops/ViewStopsWrapper";
import ShowRouteView from "@/components/map/route/ShowRouteView";
import MapPageLayout from "@/layout/MapPageLayout";
import ResultsWrapper from "@/components/sidebar/wrappers/ResultsWrapper";

import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";

// /data
import RouteData from "@/data/route_data.json";

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
    <MapPageLayout
      sidebarContent={
        <>
          <ViewWrapper>
            <Heading className="mb-3" level={4}>
              Routes
            </Heading>

            <SearchableCombobox
              label="Route"
              options={RouteData.map((rt) => ({ id: rt.id, name: rt.name }))}
              selected={selectedRoute}
              onChange={(opt) => handleRouteSelect(opt)}
              placeholder="e.g. Ratna Park to Mangalbazar"
              className="mb-4"
            />

            <Button
              iconStyle={"fi fi-rr-search"}
              title={selectedRoute ? "Show Stops" : "Search"}
              ariaLabel="search"
              className="text-xs"
              onClick={handleShowResults}
            />
          </ViewWrapper>

          {showResults && (
            <ResultsWrapper onClose={() => setShowResults(false)}>
              <ViewStopsWrapper />
            </ResultsWrapper>
          )}
        </>
      }
      mapContent={
        <>
          <ShowRouteView fitRouteToWindow={fitRouteToWindow} />
        </>
      }
    />
  );
};

export default RoutesPage;
