import React from "react";
import "./DataFilter.css";

interface DataFilterProps<T> {
  searchedTerm: string;
  handleSearch: (term: string, selectedCol?: (keyof T)[] | undefined) => void;
}

function DataFilter<T>({ searchedTerm, handleSearch }: DataFilterProps<T>) {
  return (
    <div className="filter-input-container">
      <input
        type="text"
        value={searchedTerm}
        onChange={(e) => handleSearch(e.target.value.toLowerCase())}
      />
      <button className="reset-button" onClick={() => handleSearch("")}>
        Reset
      </button>
    </div>
  );
}

export default DataFilter;
