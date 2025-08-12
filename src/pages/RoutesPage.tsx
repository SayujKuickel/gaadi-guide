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

// icons
import { Eye } from "lucide-react";
import { SITE_TOP_TITLE, SITE_BASE_URL } from "@/constants/siteConfigs";
import {
  Button,
  Heading,
  BottomSheet,
  SearchableCombobox,
  ContentPanel,
} from "@/components/ui";
import { SidebarLayout } from "@/components/layouts";
import MapRendererLayer from "@/components/map/MapRendererLayer";
import { ActiveRouteRenderer } from "@/components/map/renderer";
import { BusStopsSummary } from "@/components/features/bus";
import { RouteStopsSummary } from "@/components/features/routes";

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
          {selectedRoute?.name ? selectedRoute.name : "Routes"}
          {SITE_TOP_TITLE}
        </title>
        <link rel="canonical" href={`${SITE_BASE_URL}/routes`} />
      </Helmet>
      <SidebarLayout>
        <ContentPanel>
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
        </ContentPanel>

        {showResults && (
          <BottomSheet onClose={() => setShowResults(false)}>
            <RouteStopsSummary />
          </BottomSheet>
        )}
      </SidebarLayout>

      <MapRendererLayer>
        <ActiveRouteRenderer fitRouteToWindow={fitRouteToWindow} />
      </MapRendererLayer>
    </>
  );
};

export default RoutesPage;
