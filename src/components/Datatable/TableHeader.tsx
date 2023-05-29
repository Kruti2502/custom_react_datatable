import React, { Key } from "react";
import { ColumnType, SortKeysType, SortOrderType } from "./utilities/type";
import "./TableHeader.css";

interface TableHeaderProps<T> {
  headerColor?: string;
  header: ColumnType<T>[];
  colRef: React.MutableRefObject<HTMLTableCellElement[]>;
  sortable?: boolean;
  changeSort: (arg: SortKeysType<T>) => void;
  resizableColumns?: boolean;
  draggable?: boolean;
  handleDragStartColumn: (
    arg1: React.DragEvent<HTMLTableCellElement>,
    arg2: number
  ) => void;
  handleDragOverColumn: (
    arg1: React.DragEvent<HTMLTableCellElement>,
    arg2: number
  ) => void;
  handleDropColumn: (
    arg1: React.DragEvent<HTMLTableCellElement>,
    arg2: number
  ) => void;
  sortKey: SortKeysType<T>;
  sortOrder: SortOrderType;
  showGridLines?: boolean;
}

function TableHeader<T>({
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
}: TableHeaderProps<T>) {
  return (
    <thead className="table-header">
      <tr style={{ backgroundColor: headerColor }} className="table-row">
        {header.map((column, colIndex) => (
          <th
            key={column.key as Key}
            ref={(element) => colRef.current.push(element!)}
            onClick={() => {
              sortable && changeSort(column.key);
            }}
            className={`table-header-cell ${
              resizableColumns || showGridLines
                ? "table-header-cell-resizable"
                : ""
            }`}
            draggable={draggable ? true : false}
            onDragStart={(e) => handleDragStartColumn(e, colIndex)}
            onDragOver={(e) => handleDragOverColumn(e, colIndex)}
            onDrop={(e) => handleDropColumn(e, colIndex)}
          >
            <div className="table-header-data">
              {column.label}
              {sortable && (
                <span
                  className={`${
                    sortKey === column.key
                      ? sortOrder === "desc"
                        ? "sort-icon sort-reverse"
                        : "sort-icon"
                      : "sort-icon-hide"
                  }`}
                >
                  &#9650;
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
