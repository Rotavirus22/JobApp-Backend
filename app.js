// Package initialization
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const errorHandlers = require("./handlers/errorHandlers");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");
const jobRoute = require("./modules/job/job.routes");
const paymentRoute = require("./modules/subscription/payment.routes");

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
require("./models/job.model");
require("./models/apply.model");
require("./models/payment.model");

// Schedule a cron job to run every day at midnight
const jobCron = cron.schedule("0 0 * * *", async () => {
  const jobModel = mongoose.model("jobs");

  const jobs = await jobModel.find();
  const currentDate = new Date();

  jobs.forEach(async (job) => {
    if (job.endDate < currentDate) {
      await jobModel.findByIdAndUpdate(job._id, { job_status: "Expired" });
    }
  });
});

//for creating the json files
app.use(express.json());

//Routes
app.use("/api/users", userRoute);
app.use("/api/job", jobRoute);
app.use("/api/payment", paymentRoute);

//if any route which isn't found

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "failed",
    message: "Not found !!",
  });
});

app.use(errorHandlers);

jobCron.start();

app.listen(8000, () => {
  console.log("Server Started Successfully !");
});
