# Custom React Datatable

A React Component to create a custom 'datatable'.

## Features

- Sorting
- Paginator
  - Basic
  - Template
- Filter the data
- Resizeable
- Draggable for rows
- Draggable for columns
- Hide and show columns

# Getting Started

## Setup

```bash
npm install custom-react-datatable
```

# Props

- `columns`: an array that contains the info needed by the component to build the table.
- `rows`: an array of items used to fill the table.
- `sortable`: sort the data.
- `paginator`: enables efficient navigation and control over content.
- `noOfRowsPerPage`: number of rows to be displayed per page when paginator is enable.
- `paginatorTemplate`: each element can also be customized further with your own UI to replace the default one.
- `currentPageReportTemplate`: template for showing page numbers.
- `resizableColumns`: enables dynamically adjust the width of columns.
- `draggable`: allowing users to effortlessly rearrange and reposition data elements within the table.
- `filterable`: allows you to quick and precise retrieval of specific information based on search term.
- `defaultCheckedCols`: accepts an array of columns that will be visible when the component renders.
- `maxHeight`: enables to set a maximum height for the table component.
- `headerColor`: allows you to customize the color of the table header.
- `evenRowColor`: allows you to customize the color of the even rows.
- `oddRowColor`: allows you to customize the color of the odd rows.
- `showGridLines`: allows you to show grid lines in table.

# Usage

## Basic Example

```
interface ColumnType {
  key: keyof (typeof rows)[0];
  label: string;
  minWidth?: string;
}

interface RowType {
  id: number;
  first_name: string;
  last_name: string;
}

const rows: RowType[] = [
  {
    id: 1,
    first_name: "Rufus",
    last_name: "Jolin",
  },
  {
    id: 2,
    first_name: "Bondon",
    last_name: "Reasce",
  },
  {
    id: 3,
    first_name: "Davin",
    last_name: "Towlson",
  },
  {
    id: 4,
    first_name: "Barnebas",
    last_name: "Ferraraccio",
  },
];

const columns: ColumnType[] = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First name", minWidth: "500" },
  { key: "last_name", label: "Last name" },
];

function App() {
  return <Datatable {...{ columns, rows }} />;
}

export default App;
```

## Using Props 

```
return (
    <Datatable
      {...{ columns, rows }}
      sortable
      paginator
      noOfRowsPerPage={8}
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
```

## Template Pagination 

Each element can also be customized further with your own UI to replace the default one. Dynamic variables for `currentPageReportTemplate` are 
- { first } = index of first row
- { last } = index of last row
- { curPage } = current page
- { totalRecords } = no. of total rows

```
return (
    <Datatable
      {...{ columns, rows }}
      paginator
      noOfRowsPerPage={8}
      paginatorTemplate="prevPageLink currentPageReport nextPageLink rowsPerPageInput"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
    />
  );
```