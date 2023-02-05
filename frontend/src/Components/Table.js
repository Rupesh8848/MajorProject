import React, { useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useTable,
  useSortBy,
} from "react-table";
import { COLUMNS } from "../Utils/Columns";
// import MOCK_DATA from "../Utils/MOCK_DATA.json";
import { CheckBox } from "./Checkbox";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";
import "./Table.css";

export default function BasicTable({ cloumnSearchStatus, tableData }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <CheckBox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows, //contins the selected row data
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <section className="container-with-global-search">
        <div className="global-filter-search">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>

        <div className="table-container">
          <table {...getTableProps}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : ""}
                      </span>
                      {cloumnSearchStatus && (
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} height="20px">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

//   <pre>
//     <code>
//       {JSON.stringify(
//         {
//           selectedFlatRows: selectedFlatRows.map((row) => row.original),
//         },
//         null,
//         2
//       )}
//     </code>
//   </pre>
