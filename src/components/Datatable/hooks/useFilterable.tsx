import React, { useMemo, useState } from "react";
import { ColumnType, HeaderCellType, RowType } from "../utilities/type";

function useFilterable<T>(
  header: ColumnType<T>[],
  rows: RowType<T>[],
  setData: React.Dispatch<React.SetStateAction<RowType<T>[]>>,
  filterable?: boolean
) {
  const [searchedTerm, setSearchedTerm] = useState("");
  const keysOfSelectedColumns = useMemo(
    () => header.map((column) => column.key),
    [header]
  );

  const getFilteredData = (
    term: string,
    selectedColumns?: HeaderCellType<T>[]
  ) => {
    const keys = selectedColumns ? selectedColumns : keysOfSelectedColumns;
    return rows.filter((row) => {
      return keys.some((key) => {
        const value = row[key];
        if (typeof value === "string") {
          return value.toLowerCase().includes(term);
        } else if (typeof value === "number") {
          return value.toString().includes(term);
        }
        return false;
      });
    });
  };

  const handleSearch = (term: string, selectedCol?: HeaderCellType<T>[]) => {
    const filteredData = getFilteredData(term, selectedCol);
    setSearchedTerm(term);
    filterable && setData(filteredData);
  };

  const highlightMatches = (text: string | number) => {
    const cellContent = text.toString();
    const regex = new RegExp(`(${searchedTerm})`, "gi");
    return cellContent.split(regex).map((part, index) => {
      if (part.toLowerCase() === searchedTerm.toLowerCase()) {
        return (
          <span key={index} style={{ backgroundColor: "rgb(98, 148, 194)" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return {
    searchedTerm,
    setSearchedTerm,
    handleSearch,
    highlightMatches,
  };
}

export default useFilterable;
