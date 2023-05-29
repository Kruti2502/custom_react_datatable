export type HeaderCellType<T> = keyof T;

export type RowType<T> = T & { id?: number };

export interface ColumnType<T> {
  key: HeaderCellType<T>;
  label: string;
  minWidth?: string;
}

export type SortKeysType<T> = HeaderCellType<T> | undefined;

export type SortOrderType = "asc" | "desc";
