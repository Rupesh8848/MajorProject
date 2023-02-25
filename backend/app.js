const express = require("express");
const cors = require("cors");
const userRoute = require("./Routes/userRoute");
const { fileRouter } = require("./Routes/fileRoute");
const { folderRoute } = require("./Routes/folderRoute");
const { recentRoute } = require("./Routes/recentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/file", fileRouter);
app.use("/api/folder", folderRoute);
app.use("/api/recent", recentRoute);

module.exports = app;
