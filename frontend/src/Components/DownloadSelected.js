import axios from "axios";
import React from "react";
import fileDownload from "js-file-download";
import "./DownloadSelected.css";
import { loaderContext } from "../Context/loaderContext";

export default function DownloadSelected({ selectedObjects, getYourFile }) {
  const { setLoaderState } = React.useContext(loaderContext);
  const urls = [];
  const downloadSelected = async () => {
    setLoaderState(true);
    selectedObjects.forEach((obj) => {
      const { cid, name } = obj.original;
      console.log(obj);
      if (obj.original.protected === "public") {
        let link = `https://${cid}.ipfs.w3s.link/${name}`;
        urls.push({ link, name });
      } else {
        getYourFile(cid);
      }
    });
    for (let obj of urls) {
      await axios.get(obj.link, { responseType: "blob" }).then((res) => {
        fileDownload(res.data, obj.name);
      });
    }
    setLoaderState(false);
    // console.log(urls);
  };
  //   console.log(selectedObjects);
  return (
    <button onClick={downloadSelected} className="downloadButton">
      Download Selected
    </button>
  );
}
