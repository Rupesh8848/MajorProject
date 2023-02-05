const express = require("express");
const { userChecker } = require("../Controllers/userController");

const userRoute = express.Router();

userRoute.get("/:userMetaMaskId", userChecker);

module.exports = userRoute;
