import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FolderRoutes from "../Routes/FolderRoutes";
import FileRenderer from "./FileRenderer";
import FolderRenderer from "./FolderRenderer";

export default function MainContainer() {
  const { User } = useSelector((state) => state);
  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <>
              <div>Folders:</div>
              <FolderRenderer folders={User.data.folders} />
              <div>Files:</div>
              <FileRenderer files={User.data.files} />
            </>
          }
        />
        <Route path="/user/folder/:folderId" element={<FolderRoutes />} />
      </Routes>
    </div>
  );
}
