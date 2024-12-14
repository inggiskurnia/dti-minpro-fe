"use client";

import React, { useState, useEffect, useRef } from "react";
import { getCities } from "@/api/getFilters";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchCityProps {
  cityId: number | undefined;
  setCityId: (cityId: number | undefined) => void;
}

const SearchCity: React.FC<SearchCityProps> = ({ cityId, setCityId }) => {
  const [cities, setCities] = useState<{ cityId: number; cityName: string }[]>(
    []
  );
  const [cityQuery, setCityQuery] = useState<string>("");
  const debouncedCityQuery = useDebounce(cityQuery, 500);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cityData = await getCities(debouncedCityQuery);
        setCities(cityData);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      }
    };
    if (debouncedCityQuery) {
      loadCities();
    }
  }, [debouncedCityQuery]);

  const handleCityClick = (id: number, name: string) => {
    setCityId(id);
    setCityQuery(name);
    setDropdownVisible(false);
  };

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const clearSelection = () => {
    setCityId(undefined);
    setCityQuery("");
  };

  return (
    <div className="relative w-32">
      <input
        type="text"
        ref={inputRef}
        placeholder="Search City"
        value={cityQuery}
        onChange={(e) => setCityQuery(e.target.value)}
        onFocus={handleFocus}
        className="w-full rounded bg-gray-200 text-gray-700 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {dropdownVisible && cityQuery && (
        <div className="absolute left-0 top-full z-20 mt-1 rounded max-h-40 w-full overflow-y-auto border border-gray-300 bg-white">
          {cities.length > 0 ? (
            cities.map((city) => (
              <div
                key={city.cityId}
                onClick={() => handleCityClick(city.cityId, city.cityName)}
                className="cursor-pointer py-1 px-2 text-gray-700 hover:bg-gray-100 "
              >
                {city.cityName}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-700">No cities found</div>
          )}
          <hr className="border-gray-300" />
          <div
            onClick={clearSelection}
            className="cursor-pointer p-2 text-gray-700 hover:bg-gray-100"
          >
            Clear selection
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCity;
