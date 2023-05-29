import React from "react";
import Datatable from "./components/Datatable/Datatable";
import rows from "./data.json";

type ColumnKeys = keyof (typeof rows)[0];

interface ColumnType {
  key: ColumnKeys;
  label: string;
  minWidth?: string;
}

const columns: ColumnType[] = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First name" },
  { key: "last_name", label: "Last name" },
  { key: "email", label: "Email" },
  { key: "phone_no", label: "Phone No." },
  { key: "address", label: "Address" },
];

function App() {
  return (
    <Datatable
      {...{ columns, rows }}
      sortable
      paginator
      noOfRowsPerPage={8}
      paginatorTemplate="prevPageLink currentPageReport nextPageLink rowsPerPageInput"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      resizableColumns
      draggable
      filterable
      defaultCheckedCols={["id", "first_name", "last_name"]}
      maxHeight={"1000"}
      headerColor={"#3cb371"}
      evenRowColor={"rgb(250, 250, 250)"}
      oddRowColor={"rgb(240, 240, 240)"}
      showGridLines
    />
  );
}

export default App;
