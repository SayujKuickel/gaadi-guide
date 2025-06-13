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
  setSidebarIndex: (key: number) => void;
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({
  selectedRoute,
  handleRouteSelect,
  setSidebarIndex,
}) => {
  return (
    <div className="px-4 py-3 bg-surface rounded-lg w-full md:w-76">
      <Heading className="mb-3" level={4}>
        Select Route
      </Heading>

      <SearchableCombobox
        label="Route"
        options={RouteData.map((rt) => ({ id: rt.id, name: rt.name }))}
        selected={selectedRoute}
        onChange={(opt) => handleRouteSelect(opt)}
        placeholder="Type here to search..."
      />

      {selectedRoute && (
        <Button
          onClick={() => setSidebarIndex(2)}
          ariaLabel="Show Stops button"
          className="text-sm font-[500] mt-4"
          iconStyle="fi fi-rr-land-layer-location"
          title="View Stops"
        />
      )}
    </div>
  );
};

export default RoutesWrapper;
