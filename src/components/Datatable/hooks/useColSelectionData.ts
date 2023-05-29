import { ColumnType, HeaderCellType } from "../utilities/type";

const useColSelectionData = <T>(
  header: ColumnType<T>[],
  totalColumns: ColumnType<T>[],
  searchedTerm: string,
  setHeader: React.Dispatch<React.SetStateAction<ColumnType<T>[]>>,
  handleSearch: (arg1: string, arg2: HeaderCellType<T>[]) => void
) => {
  const keysOfSelectedColumns: HeaderCellType<T>[] = header.map(
    (obj) => Object.values(obj)[0]
  );

  const handleUpdateColumns = (columnKey: HeaderCellType<T>) => {
    if (keysOfSelectedColumns?.includes(columnKey)) {
      const selectedColumns = keysOfSelectedColumns.filter(
        (existingItem) => existingItem !== columnKey
      );
      const transformSelectedHeader = header.filter((col) =>
        selectedColumns?.includes(col.key)
      );
      setHeader(transformSelectedHeader);
    } else {
      keysOfSelectedColumns.push(columnKey);
      const checkedColumn = totalColumns.filter(
        (column) => column.key === columnKey
      );
      const transformSelectedHeader = header.filter((col) =>
        keysOfSelectedColumns?.includes(col.key)
      );
      transformSelectedHeader.push(...checkedColumn);
      setHeader(transformSelectedHeader);
    }
    handleSearch(searchedTerm, keysOfSelectedColumns);
  };

  return {
    keysOfSelectedColumns,
    handleUpdateColumns,
  };
};

export default useColSelectionData;
