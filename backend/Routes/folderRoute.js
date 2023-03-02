const express = require("express");
const {
  addFolder,
  getFolderContains,
  nestedFolder,
} = require("../Controllers/folderController");
const folderRoute = express.Router();

folderRoute.post("/", addFolder);
folderRoute.get("/:folderId", getFolderContains);
folderRoute.post("/nestedFolder/:parentFolder", nestedFolder);

module.exports = { folderRoute };
