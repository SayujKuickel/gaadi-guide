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
      <Heading className="mb-3" level={4}>
        Routes
      </Heading>

      <SearchableCombobox
        label="Route"
        options={RouteData.map((rt) => ({ id: rt.id, name: rt.name }))}
        selected={selectedRoute}
        onChange={(opt) => handleRouteSelect(opt)}
        placeholder="e.g. Ratna Park to Mangalbazar"
      />
    </>
  );
};

export default RoutesWrapper;
