// \React
import { useState, useRef, useEffect } from "react";
// \Types
import type { IRouteOption } from "@/types/routeOptions.types";
import Button from "./Button";

interface Props {
  options: IRouteOption[];
  selected: IRouteOption | null;
  onChange: (option: IRouteOption) => void;
  placeholder?: string;
}

const SearchableCombobox = ({
  options,
  selected,
  onChange,
  placeholder = "Select an option",
}: Props) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [dropdownAbove, setDropdownAbove] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key === "ArrowDown") {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (e.key === "Enter" && filteredOptions[highlightedIndex]) {
      const selectedOption = filteredOptions[highlightedIndex];
      onChange(selectedOption);
      setQuery(selectedOption.name);
      setIsOpen(false);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync query when selected prop changes
  useEffect(() => {
    if (selected) {
      setQuery(selected.name);
    }
  }, [selected]);

  // Prevent out-of-bounds highlight index
  useEffect(() => {
    if (highlightedIndex >= filteredOptions.length) {
      setHighlightedIndex(0);
    }
  }, [filteredOptions, highlightedIndex]);

  // Detect dropdown position based on viewport space
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 240;

    setDropdownAbove(spaceBelow < dropdownHeight);
  }, [isOpen, filteredOptions.length]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="flex items-center gap-1">
        <input
          type="text"
          className="w-full p-2 rounded-lg bg-surface-3 border-0 outline-0 focus:outline"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onClick={() => setIsOpen(true)}
        />

        {query && (
          <Button
            onClick={() => {
              setQuery("");
              setIsOpen(true);
            }}
            iconStyle="fi fi-rr-trash"
            className="h-full hover:text-primary"
            ariaLabel="Clear Select"
          />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 w-full rounded-md shadow-lg max-h-60 scrollbar-sa overflow-auto bg-surface-3 ${
            dropdownAbove ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {filteredOptions.length > 0 ? (
            <ul>
              {filteredOptions.map((option, index) => (
                <li
                  key={option.id}
                  className={`px-3 py-2 cursor-pointer ${
                    index === highlightedIndex ? "bg-surface-2" : ""
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseDown={() => {
                    onChange(option);
                    setQuery(option.name);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-offTextasd">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableCombobox;
