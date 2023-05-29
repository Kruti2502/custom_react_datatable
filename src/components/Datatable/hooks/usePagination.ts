import { useMemo } from "react";
export const DOTS = "...";

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  siblingCount: number;
  currentPage: number;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const arrayToObjectArray = (arr: Array<string | number>) => {
  return arr.map((ele, i) => {
    return {
      id: ele + String(i),
      key: ele,
    };
  });
};

export const usePagination = ({
  totalRows,
  rowsPerPage,
  siblingCount = 1,
  currentPage,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalRows / rowsPerPage);
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return arrayToObjectArray(range(1, totalPageCount));
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return arrayToObjectArray([...leftRange, DOTS, totalPageCount]);
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return arrayToObjectArray([firstPageIndex, DOTS, ...rightRange]);
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return arrayToObjectArray([
        firstPageIndex,
        DOTS,
        ...middleRange,
        DOTS,
        totalPageCount,
      ]);
    }
  }, [totalRows, rowsPerPage, siblingCount, currentPage]);

  return paginationRange;
};
