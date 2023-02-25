import React from "react";
import { useSelector } from "react-redux";
import FileRenderer from "./FileRenderer";

export default function RecentlyOpened() {
  const { recent } = useSelector((state) => state);
  return (
    <>
      <div>Recently Opened:</div>
      {recent?.data?.dataToSend === 0 ? (
        <div>No Recent Files</div>
      ) : (
        <FileRenderer files={recent?.data?.dataToSend} />
      )}
    </>
  );
}
