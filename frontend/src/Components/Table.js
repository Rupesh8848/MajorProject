import React, { useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useTable,
  useSortBy,
} from "react-table";
import { tableContext } from "../Context/tableDataContext";
// import { COLUMNS } from "../Utils/Columns";
// import MOCK_DATA from "../Utils/MOCK_DATA.json";
import { CheckBox } from "./Checkbox";
import ColumnFilter from "./ColumnFilter";
import DeleteSelected from "./DeleteSelected";
import GlobalFilter from "./GlobalFilter";
import moment from "moment";
import fileSize from "file-size";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import "./Table.css";
import DownloadSelected from "./DownloadSelected";

export default function BasicTable({ cloumnSearchStatus }) {
  const { tableState, settableState } = React.useContext(tableContext);
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => {
          const { cid, type, name } = row.values;
          if (type === "file") {
            let link = `https://${cid}.ipfs.w3s.link/${name}`;
            return (
              <a href={link} target="_blank">
                {name}
              </a>
            );
          } else if (type === "folder") {
            async function handleClick() {
              console.log(row.original);
              const response = await axios.get(
                `${baseUrl}/api/folder/${row.original.id}`
              );
              settableState(response.data.contains);
            }
            return <div onClick={handleClick}>{row.values.name}</div>;
          }
        },
      },
      {
        Header: "CID",
        accessor: "cid",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Size",
        accessor: "size",
        Cell: ({ value }) => {
          return fileSize(value).human();
        },
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => {
          return moment(value).fromNow();
        },
      },
    ],
    []
  );
  const data = useMemo(() => tableState, [tableState]);

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

  // React.useEffect(() => {
  //   console.log(selectedFlatRows);
  // }, [selectedFlatRows]);

  const { globalFilter } = state;

  return (
    <>
      <section className="container-with-global-search">
        <div className="table-container">
          <div className="global-filter-search">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          <table {...getTableProps} className="table">
            <thead className="table__header">
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
        <div className="bottom-button">
          <div>
            {selectedFlatRows.length !== 0 && (
              <DownloadSelected selectedObjects={selectedFlatRows} />
            )}
          </div>
          <div>
            {selectedFlatRows.length !== 0 && (
              <DeleteSelected selectedObjects={selectedFlatRows} />
            )}
          </div>
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
