import { useEffect, useRef } from "react";

const useResizable = (resizableColumns?: boolean) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const colRef = useRef<Array<HTMLTableCellElement>>([]);
  const columns = colRef.current;

  useEffect(() => {
    if (resizableColumns && tableRef.current) {
      tableRef.current.style.minWidth = "100vw";
      tableRef.current.style.width = "auto";
    }
  }, [resizableColumns]);

  const createResizableColumn = function (resizer: HTMLDivElement) {
    let pressed = false;
    let start: HTMLElement | null = null;
    let startX: number, startWidth: number | undefined;

    resizer.addEventListener("mousedown", (event: MouseEvent) => {
      start = (event.target as HTMLElement).parentElement;
      startX = event.pageX;
      startWidth = start?.offsetWidth;
      pressed = true;
    });

    document.addEventListener("mousemove", function (event: MouseEvent) {
      if (pressed) {
        const width = startWidth! + (event.pageX - startX);
        start!.style.width = width + "px";
      }
    });

    document.addEventListener("mouseup", function () {
      pressed = false;
    });
  };

  useEffect(() => {
    if (columns.length > 0) {
      columns.forEach(function (column) {
        const resizingElement = column?.querySelector(".resizer");

        if (resizableColumns) {
          if (resizingElement !== null) {
            return;
          }
          const resizer = document.createElement("div");
          resizer.classList.add("resizer");
          resizer.style.height = `${tableRef.current?.offsetHeight}px`;
          column.appendChild(resizer);

          createResizableColumn(resizer);
        } else {
          if (resizingElement) {
            resizingElement.remove();
          }
        }
      });
    }
  }, [columns, resizableColumns, columns.length]);

  return {
    tableRef,
    colRef,
  };
};

export default useResizable;
