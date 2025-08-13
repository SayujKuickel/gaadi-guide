import { useState, useRef, useEffect } from "react";
import { Trash2 } from "lucide-react";
import Button from "./Button";

interface BaseOption {
  id: string | number;
  name: string;
}

interface Props<T extends BaseOption> {
  options: T[];
  selected: T | null;
  onChange: (option: T) => void;
  className?: string;
  placeholder?: string;
  label: string;
}

const SearchableCombobox = <T extends BaseOption>({
  options,
  selected,
  onChange,
  placeholder = "Select an option",
  label,
  className,
}: Props<T>) => {
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

  useEffect(() => {
    if (selected) {
      setQuery(selected.name);
    } else {
      setQuery("");
    }
  }, [selected]);

  useEffect(() => {
    if (highlightedIndex >= filteredOptions.length) {
      setHighlightedIndex(0);
    }
  }, [filteredOptions, highlightedIndex]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 240;

    setDropdownAbove(spaceBelow < dropdownHeight);
  }, [isOpen, filteredOptions.length]);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div className="">
        <label
          className="text-sm capitalize text-offText/75 mb-0.5 block"
          htmlFor={label}
        >
          {label}
        </label>

        <div className="flex items-center gap-1">
          <input
            type="text"
            className="w-full px-2 py-1.5 rounded-lg bg-input-background border-2 border-input-border text-input-text outline-0 focus:outline"
            autoComplete="off"
            placeholder={placeholder}
            value={query}
            name={label}
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
              icon={<Trash2 size={16} />}
              variant="secondary"
              ariaLabel="Clear Select"
              className="hover:text-sa-red ml-1"
            />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className={`absolute z-[999999] w-full rounded-md shadow-lg max-h-60 scrollbar-sa overflow-auto bg-surface-3 ${
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
