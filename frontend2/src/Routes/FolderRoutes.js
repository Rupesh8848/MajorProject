import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { baseUrl } from "../BaseUrl";
import FileRenderer from "../Components/FileRenderer";
import FolderRenderer from "../Components/FolderRenderer";
import { setUserData } from "../Slices/userDataSlice";

export default function FolderRoutes() {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`${baseUrl}/api/folder/${folderId}`);
      dispatch(setUserData({ folders: [], files: response.data.contains }));
    }
    getData();
  }, []);
  return (
    !userData.loading && (
      <div>
        <span>Folders:</span>
        <FolderRenderer folders={userData.data.folders} />
        <span>Files:</span>
        <FileRenderer files={userData.data.files} />
      </div>
    )
  );
}
