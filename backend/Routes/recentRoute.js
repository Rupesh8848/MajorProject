const express = require("express");
const {
  addToRecent,
  getRecent,
  getFourRecent,
} = require("../Controllers/recentController");

const recentRoute = express.Router();

recentRoute.post("/", addToRecent);
recentRoute.get("/:user", getRecent);
recentRoute.get("/:user/recent", getFourRecent);

module.exports = { recentRoute };
