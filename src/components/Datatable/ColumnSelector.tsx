import React, { Key } from "react";
import { ColumnType, HeaderCellType } from "./utilities/type";
import "./ColumnSelector.css";

interface ColumnSelectorProps<T> {
  columns: ColumnType<T>[];
  keysOfSelectedColumns?: HeaderCellType<T>[];
  defaultCheckedCols?: HeaderCellType<T>[];
  handleUpdateColumns: (arg: HeaderCellType<T>) => void;
}

function ColumnSelector<T>({
  columns,
  keysOfSelectedColumns,
  defaultCheckedCols,
  handleUpdateColumns,
}: ColumnSelectorProps<T>) {
  return (
    <div className="column-selection">
      {columns.map((column) => (
        <div key={column.key as Key} className="column-checkbox">
          <input
            type="checkbox"
            checked={keysOfSelectedColumns?.includes(column.key)}
            disabled={defaultCheckedCols?.includes(column.key)}
            onChange={() => handleUpdateColumns(column.key)}
          />
          <span>{column.label}</span>
        </div>
      ))}
    </div>
  );
}

export default ColumnSelector;
