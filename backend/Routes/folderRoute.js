const express = require("express");
const {
  addFolder,
  updateFolder,
  getFolderContains,
} = require("../Controllers/folderController");
const folderRoute = express.Router();

folderRoute.post("/", addFolder);
folderRoute.put("/:folderId", updateFolder);
folderRoute.get("/:folderId", getFolderContains);

module.exports = { folderRoute };
