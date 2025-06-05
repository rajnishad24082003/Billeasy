const express = require("express");
require("dotenv").config();
const server = express();
const route = require("./routes/route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

server.use(bodyParser.json());
server.use(route);

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  try {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("database connected");
    });
  } catch (error) {
    console.log("unavailable to connect to database", error);
  }
});
