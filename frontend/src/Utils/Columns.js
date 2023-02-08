import moment from "moment";
import fileSize from "file-size";
import React from "react";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
export const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => {
      const { cid, type, name } = row.values;
      if (type === "file") {
        let link = `https://${cid}.ipfs.w3s.link/${name}`;

        return <a href={link}>{name}</a>;
      } else if (type === "folder") {
        async function handleClick() {
          console.log(row.original);
          const response = await axios.get(
            `${baseUrl}/api/folder/${row.original.id}`
          );
          console.log(response.data);
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
];
