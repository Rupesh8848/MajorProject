const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const { fileRouter } = require("./Routes/fileRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/file", fileRouter);

module.exports = app;
