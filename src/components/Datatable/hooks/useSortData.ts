import { useState } from "react";
import { sortData } from "../utilities/sortData";
import { RowType, SortKeysType, SortOrderType } from "../utilities/type";

const useSortData = <T>(
  rows: RowType<T>[],
  setData: React.Dispatch<React.SetStateAction<RowType<T>[]>>,
  sortable?: boolean
) => {
  const [sortKey, setSortKey] = useState<SortKeysType<T>>();
  const [sortOrder, setSortOrder] = useState<SortOrderType>("asc");

  const changeSort = (key: SortKeysType<T>) => {
    if (sortable) {
      const sortedData = sortData({
        rows: rows,
        sortKey: key,
        reverse: sortOrder === "desc",
      });

      setData(sortedData);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setSortKey(key);
    }
  };

  return {
    sortKey,
    sortOrder,
    changeSort,
  };
};

export default useSortData;
