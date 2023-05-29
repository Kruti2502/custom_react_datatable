import React from "react";
import { usePagination, DOTS } from "./hooks/usePagination";
import "./Pagination.css";

interface PaginationProps {
  onPageChange: (arg: number) => void;
  totalRows: number;
  siblingCount?: number;
  currentPage: number;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  paginatorTemplate?: string;
  currentPageReportTemplate?: string;
  indexOfFirstRow: number;
  indexOfLastRow: number;
}

const Pagination = (props: PaginationProps) => {
  let {
    onPageChange,
    totalRows,
    siblingCount = 1,
    currentPage,
    rowsPerPage,
    setRowsPerPage,
    paginatorTemplate,
    currentPageReportTemplate,
    indexOfFirstRow,
    indexOfLastRow,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalRows,
    siblingCount,
    rowsPerPage,
  });

  if (
    currentPage === 0 ||
    (paginationRange && paginationRange.length < 2) ||
    totalRows <= rowsPerPage
  ) {
    return null;
  }

  if (
    paginationRange &&
    +paginationRange[paginationRange.length - 1].key < currentPage
  ) {
    onPageChange(1);
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage =
    paginationRange && paginationRange[paginationRange.length - 1].key;

  const paginationInputhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) {
      setRowsPerPage(1);
    } else {
      setRowsPerPage(+e.target.value);
    }
  };

  const paginatorTemplateArray = paginatorTemplate?.split(" ");
  const currentPageReportTemplateReplace = currentPageReportTemplate
    ?.replace("{first}", indexOfFirstRow.toString())
    .replace(
      "{last}",
      indexOfLastRow > totalRows
        ? totalRows.toString()
        : indexOfLastRow.toString()
    )
    .replace("{totalRecords}", totalRows.toString())
    .replace("{curPage}", currentPage.toString());

  const rowsPerPageInput = (
    <input
      type="number"
      value={rowsPerPage}
      onChange={paginationInputhandler}
    />
  );

  const prevPageLink = (
    <div onClick={onPrevious} className={currentPage === 1 ? "disabled" : ""}>
      <div className="pagination-item arrow left">^</div>
    </div>
  );

  const currentPageReport = (
    <div>
      {currentPageReportTemplate ? (
        <>{currentPageReportTemplateReplace}</>
      ) : (
        <>
          <ul className="bigger-screens">
            {paginationRange?.map((pageNumber) => {
              if (pageNumber.key === DOTS) {
                return (
                  <li className="pagination-item dots" key={pageNumber.id}>
                    &#8230;
                  </li>
                );
              }
              return (
                <li
                  onClick={() => {
                    if (typeof pageNumber.key === "number") {
                      onPageChange(pageNumber.key);
                    }
                  }}
                  className={
                    pageNumber.key === currentPage
                      ? "pagination-item selected"
                      : "pagination-item"
                  }
                  key={pageNumber.id}
                >
                  {pageNumber.key}
                </li>
              );
            })}
          </ul>
          <ul className="smaller-screens">
            <li className="pagination-item">{currentPage}</li>
          </ul>
        </>
      )}
    </div>
  );

  const nextPageLink = (
    <div
      onClick={onNext}
      className={lastPage === currentPage ? "disabled" : ""}
    >
      <div className="pagination-item arrow right">^</div>
    </div>
  );

  const jsxElements = {
    rowsPerPageInput: rowsPerPageInput,
    prevPageLink: prevPageLink,
    currentPageReport: currentPageReport,
    nextPageLink: nextPageLink,
  };

  return (
    <>
      <div className="pagination">
        {paginatorTemplate ? (
          <>
            {paginatorTemplateArray?.map((element, index) => (
              <div key={index}>{(jsxElements as any)[element]}</div>
            ))}
          </>
        ) : (
          <>
            {rowsPerPageInput}
            {prevPageLink}
            {currentPageReport}
            {nextPageLink}
          </>
        )}
      </div>
    </>
  );
};

export default Pagination;
