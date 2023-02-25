const express = require("express");
const { addToRecent, getRecent } = require("../Controllers/recentController");

const recentRoute = express.Router();

recentRoute.post("/", addToRecent);
recentRoute.get("/:user", getRecent);

module.exports = { recentRoute };
