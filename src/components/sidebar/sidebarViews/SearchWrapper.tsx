import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import SearchableCombobox from "@/components/common/SearchableCombobox";
import stopsData from "@/data/stops_data.json";
import useSearchByStop from "@/hooks/useSearchByStop";
import { useEffect } from "react";

const SearchWrapper = ({ setSegments }) => {
  const {
    selectedStartStop,
    selectedDestinationStop,
    setSelectedStartStop,
    setSelectedDestinationStop,
    handleSearchByStop,
  } = useSearchByStop();

  async function handleSearch() {
    const segments = await handleSearchByStop();
    if (segments) {
      setSegments(segments);
    } else {
      console.log("no segments");
    }
  }

  // remove segments if any on unmount
  useEffect(() => {
    return () => {
      setSegments(null);
    };
  }, []);

  return (
    <div className="px-4 py-3 bg-surface rounded-lg w-full md:w-76">
      <Heading className="mb-3" level={4}>
        Search
      </Heading>

      <SearchableCombobox
        label="Start"
        selected={selectedStartStop}
        onChange={(opt) => setSelectedStartStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="Select your closest stop..."
        className="mb-2"
      />

      <SearchableCombobox
        label="Destination"
        selected={selectedDestinationStop}
        onChange={(opt) => setSelectedDestinationStop(opt)}
        options={stopsData.map((stp) => ({ id: stp.id, name: stp.name }))}
        placeholder="Select your closest stop..."
        className="mb-6"
      />

      <Button
        iconStyle="fi fi-rr-search"
        title="Search"
        ariaLabel="search"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchWrapper;
