import React from "react";
import { Route, Routes } from "react-router-dom";
import FolderRoutes from "../Routes/FolderRoutes";
import MainContainerRoute from "../Routes/MainContainerRoute";

export default function MainContainer() {
  return (
    <div className="px-4">
      <Routes>
        <Route index element={<MainContainerRoute />} />
        <Route path="/user/folder/:folderId" element={<FolderRoutes />} />
      </Routes>
    </div>
  );
}
