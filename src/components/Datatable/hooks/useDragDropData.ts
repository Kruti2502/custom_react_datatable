import { RowType, ColumnType } from "../utilities/type";

const useDragDropData = <T>(
  rows: RowType<T>[],
  header: ColumnType<T>[],
  setData: React.Dispatch<React.SetStateAction<RowType<T>[]>>,
  setHeader: React.Dispatch<React.SetStateAction<ColumnType<T>[]>>
) => {
  const handleDragStartRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    rowIndex: number
  ) => {
    e.dataTransfer.setData("text/plain", String(rowIndex));
  };

  const handleDragOverRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    rowIndex: number
  ) => {
    e.preventDefault();
  };

  const handleDropRow = (
    e: React.DragEvent<HTMLTableRowElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");

    if (+dragIndex !== dropIndex) {
      const newRows = [...rows];
      const [draggedRow] = newRows.splice(+dragIndex, 1);
      newRows.splice(+dropIndex, 0, draggedRow);
      setData(newRows);
    }
  };

  const handleDragStartColumn = (
    e: React.DragEvent<HTMLTableCellElement>,
    colIndex: number
  ) => {
    e.dataTransfer.setData("text/plain", String(colIndex));
  };

  const handleDragOverColumn = (
    e: React.DragEvent<HTMLTableCellElement>,
    colIndex: number
  ) => {
    e.preventDefault();
  };

  const handleDropColumn = (
    e: React.DragEvent<HTMLTableCellElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");

    if (+dragIndex !== dropIndex) {
      const newColumns = [...header];
      const [draggedColumn] = newColumns.splice(+dragIndex, 1);
      newColumns.splice(+dropIndex, 0, draggedColumn);
      setHeader(newColumns);
    }
  };

  return {
    handleDragStartColumn,
    handleDragOverColumn,
    handleDropColumn,
    handleDragStartRow,
    handleDragOverRow,
    handleDropRow,
  };
};

export default useDragDropData;
