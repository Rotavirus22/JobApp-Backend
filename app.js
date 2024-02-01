// Package initialization
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandlers = require("./handlers/errorHandlers");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");

require("dotenv").config();

const app = express();
app.use(cors());

//Database Connection

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo Connection Successful!");
  })
  .catch(() => {
    console.log("Mongo Connection failed");
  });

//model initialization

require("./models/users.model");
//for creating the json files
app.use(express.json());

//Routes
app.use("/api/users", userRoute);

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "failed",
    message: "Not found !!",
  });
});

app.use(errorHandlers);

app.listen(8000, () => {
  console.log("Server Started Successfully !");
});
