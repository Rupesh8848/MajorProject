import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import FolderRoutes from "../Routes/FolderRoutes";
import MainContainerRoute from "../Routes/MainContainerRoute";

export default function MainContainer() {
  return (
    <div>
      <Routes>
        <Route index element={<MainContainerRoute />} />
        <Route path="/user/folder/:folderId" element={<FolderRoutes />} />
      </Routes>
    </div>
  );
}
