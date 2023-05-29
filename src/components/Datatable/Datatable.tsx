import React,{ useMemo, useState } from "react";
import "./Datatable.css";
import { ColumnType, HeaderCellType, RowType } from "./utilities/type";
import useSortData from "./hooks/useSortData";
import usePaginationData from "./hooks/usePaginationData";
import Pagination from "./Pagination";
import useResizable from "./hooks/useResizable";
import useDragDropData from "./hooks/useDragDropData";
import useColSelectionData from "./hooks/useColSelectionData";
import ColumnSelector from "./ColumnSelector";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import useFilterable from "./hooks/useFilterable";
import DataFilter from "./DataFilter";

interface DatatableProps<T> {
  columns: ColumnType<T>[];
  rows: RowType<T>[];
  sortable?: boolean;
  paginator?: boolean;
  resizableColumns?: boolean;
  draggable?: boolean;
  defaultCheckedCols?: HeaderCellType<T>[];
  maxHeight?: string;
  headerColor?: string;
  evenRowColor?: string;
  oddRowColor?: string;
  showGridLines?: boolean;
  paginatorTemplate?: string;
  currentPageReportTemplate?: string;
  noOfRowsPerPage?: number;
  filterable?: boolean;
}

function Datatable<T>({
  columns,
  rows,
  sortable,
  paginator,
  resizableColumns,
  draggable,
  defaultCheckedCols,
  maxHeight,
  headerColor,
  evenRowColor,
  oddRowColor,
  showGridLines,
  paginatorTemplate,
  currentPageReportTemplate,
  noOfRowsPerPage,
  filterable,
}: DatatableProps<T>) {
  const defaultSelectedColumns = useMemo(
    () => columns.filter((col) => defaultCheckedCols?.includes(col.key)),
    [columns, defaultCheckedCols]
  );

  const [data, setData] = useState(rows);
  const [header, setHeader] = useState(
    defaultCheckedCols ? defaultSelectedColumns : columns
  );

  const { searchedTerm, handleSearch, highlightMatches } = useFilterable(
    header,
    rows,
    setData,
    filterable
  );

  const { handleUpdateColumns, keysOfSelectedColumns } = useColSelectionData(
    header,
    columns,
    searchedTerm,
    setHeader,
    handleSearch
  );

  const { sortKey, sortOrder, changeSort } = useSortData(
    data,
    setData,
    sortable
  );

  const { tableRef, colRef } = useResizable(resizableColumns);

  const {
    handleDragStartColumn,
    handleDragOverColumn,
    handleDropColumn,
    handleDragStartRow,
    handleDragOverRow,
    handleDropRow,
  } = useDragDropData(data, header, setData, setHeader);

  const {
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    onPageChange,
    indexOfFirstRow,
    indexOfLastRow,
    currentRows,
  } = usePaginationData(data, noOfRowsPerPage);

  const tableRows = paginator ? currentRows : data;

  return (
    <div className="datatable-container">
      {filterable && <DataFilter {...{ searchedTerm, handleSearch }} />}
      {defaultCheckedCols && (
        <ColumnSelector
          {...{
            columns,
            keysOfSelectedColumns,
            defaultCheckedCols,
            handleUpdateColumns,
          }}
        />
      )}
      <div className="table-container" style={{ maxHeight: `${maxHeight}px` }}>
        <div className="table-wrapper">
          <table
            ref={tableRef}
            id="resizeMe"
            className={`table ${
              resizableColumns || showGridLines ? "table-resizable" : ""
            }`}
          >
            <TableHeader
              {...{
                headerColor,
                header,
                colRef,
                sortable,
                changeSort,
                resizableColumns,
                draggable,
                handleDragStartColumn,
                handleDragOverColumn,
                handleDropColumn,
                sortKey,
                sortOrder,
                showGridLines,
              }}
            />
            <TableBody
              {...{
                tableRows,
                oddRowColor,
                evenRowColor,
                draggable,
                handleDragStartRow,
                handleDragOverRow,
                handleDropRow,
                header,
                resizableColumns,
                showGridLines,
                highlightMatches,
              }}
            />
          </table>
        </div>
      </div>
      {paginator && (
        <Pagination
          {...{
            rowsPerPage,
            onPageChange,
            currentPage,
            setRowsPerPage,
            paginatorTemplate,
            currentPageReportTemplate,
            indexOfFirstRow,
            indexOfLastRow,
          }}
          totalRows={data.length}
        />
      )}
    </div>
  );
}

export default Datatable;
