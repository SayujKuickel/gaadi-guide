// \hooks
import useTileMap from "@/hooks/useTileMap";
import { useUserLocation } from "@/hooks/useUserLocation";
// \components
import TopRightFixedContainer from "@/components/containers/TopRightFixedContainer";
import BaseMapLayer from "@/components/map/BaseMapLayer";
import LayerSwitcher from "@/components/map/controls/LayerSwitcher/LayerSwitcher";
import MapSidebar from "@/components/sidebar/MapSidebar";
import UserLocation from "@/components/map/controls/UserLocation/UserLocation";
import ShowAllStops from "@/components/map/stop/ShowAllStops";
import ViewWrapper from "@/components/sidebar/sidebarViews/ViewWrapper";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import useFilterRoutesBySearch from "@/hooks/useFilterRoutesBySearch";
// \data
import stopsData from "@/data/stops_data.json";
import FlyToStop from "@/components/map/stop/FlyToStop";
import Heading from "@/components/common/Heading";
import ViewRouteDetails from "@/components/bus/ViewRouteDetails";
import BusLineTitle from "@/components/bus/BusLineTitle";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";

const StopsPage = () => {
  const { tileMap: tileMapKey, setTileMapKey } = useTileMap();
  const { userLocation, isSearchingLocation, getUserLocation } =
    useUserLocation();

  const {
    selectedStop,
    setSelectedStop,
    handlSsetSelectedStop,
    filteredRoutes,
  } = useFilterRoutesBySearch();

  if (!filteredRoutes) return null;

  return (
    <>
      <TopRightFixedContainer>
        <LayerSwitcher setTileMapKey={setTileMapKey} tileMapKey={tileMapKey} />

        <UserLocation
          isSearchingLocation={isSearchingLocation}
          getUserLocation={getUserLocation}
        />
      </TopRightFixedContainer>

      <div className="w-screen h-screen overflow-hidden">
        <MapSidebar>
          <ViewWrapper>
            <Heading className="mb-3" level={5}>
              Search Stops
            </Heading>

            <SearchableCombobox
              label="Select Stop"
              selected={selectedStop}
              onChange={(opt) => handlSsetSelectedStop(opt)}
              options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
              placeholder="Ratopul stop"
            />
          </ViewWrapper>

          {selectedStop?.id && (
            <ViewWrapper
              hiddenBtn={
                <Button ariaLabel="show modal" iconStyle="fi fi-rr-eye" />
              }
            >
              {filteredRoutes.length > 0 ? (
                <div className="max-h-48 overflow-auto scrollbar-sa">
                  <Heading className="mb-3" level={5}>
                    Lines for this stop
                  </Heading>

                  <ul className="space-y-4">
                    {filteredRoutes.map((route, i) => (
                      <li key={i}>
                        <BusLineTitle
                          name={route.name}
                          lineColor={route.lineColor}
                          level={5}
                          className="mb-3"
                        />

                        <Link
                          className="block w-fit"
                          to={`/routes/?route=${route.id}`}
                        >
                          <Button
                            title="Show Route"
                            iconStyle="fi fi-rr-eye"
                            className="text-xs"
                            ariaLabel={`View ${route.name} in its own page`}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-offText">This stop is not in any routes</p>
              )}
            </ViewWrapper>
          )}
        </MapSidebar>

        <BaseMapLayer
          tileMapKey={tileMapKey}
          userLocation={userLocation}
          className="relative pb-20 md:p-0 md:pl-20"
        >
          <ShowAllStops />

          <FlyToStop />
        </BaseMapLayer>
      </div>
    </>
  );
};

export default StopsPage;
