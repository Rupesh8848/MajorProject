const express = require("express");
const {
  postFile,
  deleteFile,
  getFileInfo,
} = require("../Controllers/fileController");
const fileRouter = express.Router();

fileRouter.post("/", postFile);
fileRouter.delete("/:userId/:id", deleteFile);
fileRouter.get("/:fileCid", getFileInfo);

module.exports = { fileRouter };
