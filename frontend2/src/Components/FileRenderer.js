import React from "react";
import { Link } from "react-router-dom";
import { FaFile, FaCheckCircle } from "react-icons/fa";
import { RiFileLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileToDownload,
  removeFileFromDownload,
} from "../Slices/DownloadSlice";
export default function FileRenderer({ files }) {
  const { downloadList } = useSelector((state) => state.download);
  console.log(downloadList);
  const dispatch = useDispatch();
  return !files?.length == 0 ? (
    <div>
      {files?.map((file) => {
        // console.log(file);
        const { cid, name } = file;
        const fileLink = `https://${cid}.ipfs.w3s.link/${name}`;
        return (
          <div
            key={cid}
            className="flex items-center gap-[10px] border-[2px] inline-block w-fit px-[20px] py-[10px] rounded-[10px] cursor-pointer my-[20px]"
          >
            <span
              onClick={() =>
                downloadList.includes(file)
                  ? dispatch(removeFileFromDownload(file))
                  : dispatch(addFileToDownload(file))
              }
            >
              {file.protected === "protected" ? (
                downloadList.includes(file) ? (
                  <FaCheckCircle className="scale-[1.8] text-[rgb(51,185,67)]" />
                ) : (
                  <RiFileLockFill className="scale-[1.8] text-[rgb(95,99,104)]" />
                )
              ) : downloadList.includes(file) ? (
                <FaCheckCircle className="scale-[1.8] text-[rgb(51,185,67)]" />
              ) : (
                <FaFile className="scale-150 text-[rgb(95,99,104)]" />
              )}
            </span>
            <Link to={fileLink} target="_blank">
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Doesn't contain any files.</div>
  );
}
