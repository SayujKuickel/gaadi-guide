import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
// /data
import RouteData from "@/data/route_data.json";
// /hooks
import type { IRouteOption } from "@/types/routeOptions.types";

interface RoutesWrapperProps {
  selectedRoute: IRouteOption | null;
  handleRouteSelect: (route: IRouteOption) => void;
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({
  selectedRoute,
  handleRouteSelect,
}) => {
  return (
    <>
      <Heading className="mb-3" level={5}>
        Search Routes
      </Heading>

      <SearchableCombobox
        label="Route"
        options={RouteData.map((rt) => ({ id: rt.id, name: rt.name }))}
        selected={selectedRoute}
        onChange={(opt) => handleRouteSelect(opt)}
        placeholder="Type here to search..."
      />

      {/* {selectedRoute && (
        <Button
          ariaLabel="Show Stops button"
          className="text-sm font-[500] mt-4"
          iconStyle="fi fi-rr-land-layer-location"
          title="View Stops"
        />
      )} */}
    </>
  );
};

export default RoutesWrapper;
