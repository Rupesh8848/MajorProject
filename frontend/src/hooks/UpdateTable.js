import axios from "axios";
import React from "react";
import { baseUrl } from "../BaseUrl";
import { tableContext } from "../Context/tableDataContext";

export default function UpdateTable(data) {
  console.log("From inside update table");
  const { settableState } = React.useContext(tableContext);
  React.useEffect(() => {
    async function main() {
      const response = await axios.get(`${baseUrl}/api/folder/${data.id}`);
      console.log(response);
    }
  }, []);
  return <></>;
}
