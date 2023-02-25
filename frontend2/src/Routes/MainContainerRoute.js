import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FileRenderer from "../Components/FileRenderer";
import FolderRenderer from "../Components/FolderRenderer";
import { setUser } from "../Slices/userSlice";

export default function MainContainerRoute() {
  const disptach = useDispatch();
  const { User } = useSelector((state) => state);
  React.useEffect(() => {
    async function getUserRoot() {
      disptach(setUser());
    }
    getUserRoot();
  }, []);
  return !User?.loading ? (
    <div className="">
      <div>Folders:</div>
      <FolderRenderer folders={User.data.folders} />
      <div>Files:</div>
      <FileRenderer files={User.data.files} />
    </div>
  ) : (
    <span>Loading data</span>
  );
}
