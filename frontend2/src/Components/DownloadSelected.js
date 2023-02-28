import axios from "axios";
import React from "react";
import fileDownload from "js-file-download";
import "./DownloadSelected.css";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "../Slices/spinnerSlice";
import { getYourFile } from "../Utils/getYourFile";

export default function DownloadSelected() {
  const dispatch = useDispatch();
  const { downloadList } = useSelector((state) => state.download);
  const urls = [];
  const downloadSelected = async () => {
    dispatch(showSpinner());
    for (let obj of downloadList) {
      const { cid, name } = obj;
      if (obj.protected === "public") {
        let link = `https://${cid}.ipfs.w3s.link/${name}`;
        urls.push({ link, name });
      } else {
        await getYourFile(cid);
      }
    }

    if (urls.length > 0) {
      for (let obj of urls) {
        await axios.get(obj.link, { responseType: "blob" }).then((res) => {
          fileDownload(res.data, obj.name);
        });
      }
    }
    dispatch(hideSpinner());
  };
  return (
    <button onClick={downloadSelected} className="downloadButton">
      Download Selected
    </button>
  );
}
