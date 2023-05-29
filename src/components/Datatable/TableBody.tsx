import React, { Key } from "react";
import { ColumnType, RowType } from "./utilities/type";
import "./TableBody.css";

interface TableBodyProps<T> {
  tableRows: RowType<T>[];
  oddRowColor?: string;
  evenRowColor?: string;
  draggable?: boolean;
  handleDragStartRow: (
    arg1: React.DragEvent<HTMLTableRowElement>,
    arg2: number
  ) => void;
  handleDragOverRow: (
    arg1: React.DragEvent<HTMLTableRowElement>,
    arg2: number
  ) => void;
  handleDropRow: (
    arg1: React.DragEvent<HTMLTableRowElement>,
    arg2: number
  ) => void;
  header: ColumnType<T>[];
  resizableColumns?: boolean;
  showGridLines?: boolean;
  highlightMatches: (arg: string | number) => (string | JSX.Element)[];
}

function TableBody<T>({
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
}: TableBodyProps<T>) {
  return (
    <tbody className="table-body">
      {tableRows.map((row, rowIndex) => {
        return (
          <tr
            key={row?.id as Key}
            style={{
              backgroundColor: rowIndex % 2 === 0 ? oddRowColor : evenRowColor,
            }}
            className="table-row"
            draggable={draggable ? true : false}
            onDragStart={(e) => handleDragStartRow(e, rowIndex)}
            onDragOver={(e) => handleDragOverRow(e, rowIndex)}
            onDrop={(e) => handleDropRow(e, rowIndex)}
          >
            {header.map((column) => (
              <td
                key={column.key as Key}
                className={`table-body-cell ${
                  resizableColumns ? "table-body-cell-resizable" : ""
                } ${
                  showGridLines
                    ? "show-grid-lines table-body-cell-resizable"
                    : ""
                }`}
                data-cell={column.label}
                style={{ minWidth: `${column.minWidth}px` }}
              >
                {highlightMatches(row[column.key] as string | number)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
