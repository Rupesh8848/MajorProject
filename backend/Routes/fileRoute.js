const express = require("express");
const { postFile } = require("../Controllers/fileController");
const fileRouter = express.Router();

fileRouter.post("/", postFile);

module.exports = { fileRouter };
