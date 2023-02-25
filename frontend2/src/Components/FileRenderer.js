import React from "react";
import { Link } from "react-router-dom";
import { FaFile, FaCheckCircle } from "react-icons/fa";
import { RiFileLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  addFileToDownload,
  removeFileFromDownload,
} from "../Slices/DownloadSlice";
import FileCard from "./FileCard";
import Lock from "../images/lock.jpg";

export default function FileRenderer({ files }) {
  const { downloadList } = useSelector((state) => state.download);
  console.log(downloadList);
  const { sliderState } = useSelector((state) => state.slider);
  const dispatch = useDispatch();
  return !files?.length == 0 ? (
    <div className="flex gap-8 flex-grow">
      {files?.map((file) => {
        // console.log(file);
        const { cid, name } = file;
        const fileLink = `https://${cid}.ipfs.w3s.link/${name}`;
        return (
          sliderState === file.protected && (
            <div
              key={cid}
              className="flex flex-col items-center  border-[2px] inline-block w-fit rounded-[10px] cursor-pointer my-[20px] hover:bg-[rgb(240,240,240)] overflow-hidden"
            >
              {console.log(
                `SliderState = ${sliderState}    FileState = ${file.protected}`
              )}
              <Link to={fileLink} target="_blank">
                {file.protected === "public" ? (
                  <FileCard imgLink={`https://${cid}.ipfs.w3s.link/${name}`} />
                ) : (
                  <FileCard imgLink={Lock} />
                )}
              </Link>
              <div className="flex gap-[10px] items-center py-4 px-2">
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
                    <>
                      <FaCheckCircle className="scale-[1.8] text-[rgb(51,185,67)]" />
                    </>
                  ) : (
                    <FaFile className="scale-150 text-[rgb(95,99,104)]" />
                  )}
                </span>
                <Link to={fileLink} target="_blank">
                  <span>
                    {name.length > 20 ? `${name.slice(0, 20)}...` : name}
                  </span>
                </Link>
              </div>
            </div>
          )
        );
      })}
    </div>
  ) : (
    <div>Doesn't contain any files.</div>
  );
}
