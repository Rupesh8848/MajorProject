import React from "react";
import { Route, Routes } from "react-router-dom";
import FolderRoutes from "../Routes/FolderRoutes";
import MainContainerRoute from "../Routes/MainContainerRoute";
import RecentFiles from "./RecentFiles";
import RecentlyOpened from "./RecentlyOpened";

export default function MainContainer({ currentTab }) {
  return (
    <>
      <div className="pl-8 ">
        {/* <RecentlyOpened /> */}
        <Routes>
          <Route index element={<MainContainerRoute />} />
          <Route path="/user/folder/:folderId" element={<FolderRoutes />} />
          <Route path="/recent" element={<RecentFiles />} />
        </Routes>
      </div>
    </>
  );
}
