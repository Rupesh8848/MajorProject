import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate-string";
import { FaFile } from "react-icons/fa";
export default function FileRenderer({ files }) {
  return !files?.length == 0 ? (
    <div>
      {files?.map((file) => {
        console.log(file);
        const { cid, name } = file;
        const fileExt = name.split(".").pop();
        const fileLink = `https://${cid}.ipfs.w3s.link/${name}`;
        return (
          <Link to={fileLink} target="_blank" key={cid}>
            <div className="flex items-center gap-[10px] border-[2px] inline-block w-fit px-[20px] py-[10px] rounded-[10px] cursor-pointer my-[20px]">
              <FaFile className="scale-150 text-[rgb(95,99,104)]" />
              <Truncate text={name} truncateAt={30} />
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <div>Doesn't contain any files.</div>
  );
}
