import { useSearchParams } from "react-router-dom";
import useRoute from "@/hooks/useSelectRoute";
import { checkIfNeedsTofit } from "@/utils/checkIfNeedsTofit";
import ViewWrapper from "@/components/sidebar/wrappers/ViewWrapper";
import RoutesWrapper from "@/components/sidebar/routes/RoutesWrapper";
import ViewStopsWrapper from "@/components/sidebar/stops/ViewStopsWrapper";
import Button from "@/components/common/Button";
import ShowRouteView from "@/components/map/route/ShowRouteView";
import MapPageLayout from "@/layout/MapPageLayout";

const RoutesPage = () => {
  const [searchParams] = useSearchParams();
  const { selectedRoute, handleRouteSelect } = useRoute();

  const fitRouteToWindow = checkIfNeedsTofit(searchParams);

  return (
    <MapPageLayout
      sidebarContent={
        <>
          <ViewWrapper
            hiddenBtn={
              <Button iconStyle="fi fi-rr-car-journey" ariaLabel="show route" />
            }
          >
            <RoutesWrapper
              selectedRoute={selectedRoute}
              handleRouteSelect={handleRouteSelect}
            />
          </ViewWrapper>

          {selectedRoute && (
            <ViewWrapper
              hiddenBtn={
                <Button
                  iconStyle="fi fi-rr-land-layer-location"
                  ariaLabel="show stops"
                />
              }
            >
              <ViewStopsWrapper />
            </ViewWrapper>
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
