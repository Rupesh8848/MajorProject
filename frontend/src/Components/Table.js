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
import { sliderContext } from "../Context/sliderContext";
import { createClient } from "../Utils/createClient";
import { startDecryption } from "../encFunctions";
import { ethers } from "ethers";
import { Address } from "../Utils/ContractAddress";
import PrivateABI from "../Utils/PrivateABI.json";

export default function BasicTable({ cloumnSearchStatus, user }) {
  const { tableState, settableState } = React.useContext(tableContext);
  const { sliderState } = React.useContext(sliderContext);

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
        Header: "Protection",
        accessor: "protected",
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
  const data = useMemo(() => tableState, [tableState, sliderState]);

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

  async function getYourFile(cid) {
    const client = createClient();
    const res = await client.get(cid);
    console.log(res);
    const files = await res.files();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.privateupload[0],
      PrivateABI.abi,
      signer
    );
    const accounts = await provider.listAccounts();

    const array = await contract.getusercid(accounts[0]);
    console.log(array);
    var key, iv;
    array.forEach((fileObj) => {
      if (fileObj.CID === cid) {
        console.log(fileObj);
        key = fileObj.key;
        iv = fileObj.iv;
      }
    });
    try {
      const buffer = Buffer.from(iv, "hex");
      const inv = new Uint8Array(buffer);
      console.log(inv);

      await startDecryption(files[0], key, inv);
    } catch (error) {
      console.log(error);
    }
  }

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
              <DownloadSelected
                selectedObjects={selectedFlatRows}
                getYourFile={getYourFile}
              />
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
