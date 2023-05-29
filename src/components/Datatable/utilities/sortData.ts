import { RowType, SortKeysType } from "./type";

interface SortDataProps<T> {
  rows: RowType<T>[];
  sortKey: SortKeysType<T>;
  reverse: boolean;
}

export const sortData = <T>({
  rows,
  sortKey,
  reverse,
}: SortDataProps<T>): RowType<T>[] => {
  if (!sortKey) return rows;

  const sortedData = rows.slice().sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
};
