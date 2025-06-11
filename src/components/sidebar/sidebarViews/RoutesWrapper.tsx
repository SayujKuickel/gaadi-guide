import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
// /data
import RouteData from "@/data/route_data.json";
// /hooks
import useSelectRoute from "@/hooks/useSelectRoute";

interface RoutesWrapperProps {
  setSidebarIndex: (key: number) => void;
}

const RoutesWrapper: React.FC<RoutesWrapperProps> = ({ setSidebarIndex }) => {
  const { selectedOption, handleRouteSelect } = useSelectRoute();

  return (
    <div className="px-4 py-3 bg-surface rounded-lg w-full md:w-72">
      <Heading className="mb-3" level={4}>
        Select Route
      </Heading>

      <SearchableCombobox
        options={RouteData.map((rt) => ({ id: rt.id, name: rt.name }))}
        selected={selectedOption}
        onChange={(opt) => handleRouteSelect(opt)}
        placeholder="rnac-sundarijal"
      />

      {selectedOption && (
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
