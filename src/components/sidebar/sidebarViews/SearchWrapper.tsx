import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import stopsData from "@/data/stops_data.json";
import useSearchByStop from "@/hooks/useSearchByStop";

const SearchWrapper = ({ setSegments }: any) => {
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
    } else {
      console.log("no segments");
    }
  }

  return (
    <>
      <Heading className="mb-3" level={4}>
        Search
      </Heading>

      <SearchableCombobox
        label="Start"
        selected={selectedStartStop}
        onChange={(opt) => setSelectedStartStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="e.g. Sundhara"
        className="mb-1"
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
        iconStyle={
          isSearchingForStops
            ? "fi fi-rr-loading animate-spin"
            : "fi fi-rr-search"
        }
        title={isSearchingForStops ? "Searching..." : "Search"}
        ariaLabel="search"
        className="text-sm"
        onClick={handleSearch}
      />
    </>
  );
};

export default SearchWrapper;
