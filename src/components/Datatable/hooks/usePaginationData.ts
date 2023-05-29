import { useState, useMemo } from "react";
import { RowType } from "../utilities/type";

const usePaginationData = <T>(rows: RowType<T>[], noOfRowsPerPage?: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(noOfRowsPerPage || 5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = useMemo(
    () => rows.slice(indexOfFirstRow, indexOfLastRow),
    [indexOfFirstRow, indexOfLastRow, rows]
  );

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    currentRows,
    onPageChange,
    indexOfFirstRow,
    indexOfLastRow,
  };
};

export default usePaginationData;
