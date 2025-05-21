"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const mockSuggestions = [
  "React tutorial",
  "Next.js 14 features",
  "Tailwind CSS tips",
  "Lucide icons usage",
  "YouTube clone UI",
];

export default function YouTubeSearchbar() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Use a ref to prevent dropdown after selection
  const preventDropdownRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preventDropdownRef.current) {
      setShowDropdown(false);
      preventDropdownRef.current = false;
      return;
    }

    if (query.trim()) {
      const filtered = mockSuggestions.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
    setActiveIndex(-1);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      console.log("Search for:", query);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (activeIndex >= 0 && filteredSuggestions[activeIndex]) {
        setQuery(filteredSuggestions[activeIndex]);
        preventDropdownRef.current = true;
        handleSearch();
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowDropdown(false);
    preventDropdownRef.current = true;
    handleSearch();
  };
  return (
    <div className="relative flex w-full max-w-xl items-center">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-l-full pr-10 pl-10 border border-gray-300 focus-visible:ring-0 focus-visible:border-blue-500 h-10 w-full"
        />
        {/* Clear Button with scale-up hover effect */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-transform duration-150 ease-in-out hover:scale-125"
            aria-label="Clear search"
          >
            <X size={22} />
          </button>
        )}
        {/* Dropdown */}
        {showDropdown && filteredSuggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
            {filteredSuggestions.map((item, index) => (
              <li
                key={item}
                onClick={() => handleSelect(item)}
                className={`flex items-center px-3 py-1.5 cursor-pointer text-sm hover:bg-gray-100 ${
                  index === activeIndex ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <Search size={16} className="mr-2 text-gray-500" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <div
        onClick={handleSearch}
        className="group flex items-center justify-center h-10 w-16 rounded-l-none rounded-r-full 
       bg-gray-100 border border-gray-200 cursor-pointer 
       hover:bg-gray-200 transition-colors duration-200"
      >
        <Search className="h-5 w-5 text-gray-500  " />
      </div>
    </div>
  );
}
