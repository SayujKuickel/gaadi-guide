import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import stopsData from "@/data/stops_data.json";
import useSearchByStop from "@/hooks/useSearchByStop";
import { useEffect } from "react";

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
      <Heading className="mb-3" level={5}>
        Search
      </Heading>

      <SearchableCombobox
        label="Start"
        selected={selectedStartStop}
        onChange={(opt) => setSelectedStartStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="Select your closest stop."
        className="mb-1"
      />

      <SearchableCombobox
        label="Destination"
        selected={selectedDestinationStop}
        onChange={(opt) => setSelectedDestinationStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="Select your Destination stop."
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
        onClick={handleSearch}
      />

      <p className="mt-4 text-[10px] text-on-surface/60">
        Note: This feature is still under development. There may be bugs!
      </p>
    </>
  );
};

export default SearchWrapper;
