import React, { useState, useEffect } from "react";

// Custom Hook for debouncing search
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Debouncing search by 500ms

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery); // Call the onSearch handler with the debounced query
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className="flex items-center bg-white bg-opacity-40 p-2 rounded-lg backdrop-blur-md">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-md outline-none"
      />
      <button
        onClick={() => onSearch(query)} // Optional: to allow manual search trigger
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
