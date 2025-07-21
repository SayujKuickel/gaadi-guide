import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import stopsData from "@/data/stops_data.json";
import useSearchByStop from "@/hooks/useSearchByStop";
import { Loader, Search } from "lucide-react";

const SearchWrapper = ({ setSegments, setShowResults }: any) => {
  const {
    selectedStartStop,
    selectedDestinationStop,
    setSelectedStartStop,
    setSelectedDestinationStop,
    handleSearchByStop,
    isSearchingForStops,
  } = useSearchByStop();

  async function handleSearch() {
    const segments = await handleSearchByStop();

    if (segments && segments.segments) {
      setSegments(segments.segments);
      setShowResults(true);
    }
  }

  return (
    <>
      <Heading className="mb-3" level={2}>
        Search
      </Heading>

      <SearchableCombobox
        label="Start"
        selected={selectedStartStop}
        onChange={(opt) => setSelectedStartStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="e.g. Sundhara"
        className="mb-1.5"
      />

      <SearchableCombobox
        label="Destination"
        selected={selectedDestinationStop}
        onChange={(opt) => setSelectedDestinationStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="e.g. Kalanki"
        className="mb-4"
      />

      <Button
        icon={
          isSearchingForStops ? (
            <span className="animate-spin">
              <Loader size={16} />
            </span>
          ) : (
            <Search size={16} />
          )
        }
        title={isSearchingForStops ? "Searching..." : "Search"}
        ariaLabel="search"
        className="text-xs text-on-surface font-[600]"
        onClick={handleSearch}
      />
    </>
  );
};

export default SearchWrapper;
