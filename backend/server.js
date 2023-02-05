const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const mongoose = require("mongoose");

require("dotenv").config({});

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Successfully connected to DB");
  server.listen(8000, () => {
    console.log("Server started and listening at port 8000");
  });
});
