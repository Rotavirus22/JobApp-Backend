//Exporting the express, mongoose and whatever needed like other files

const express = require("express");
const auth = require("../../middleware/auth");
const createJob = require("./controllers/createJob");

//providing the routing query
const jobRoute = express.Router();

//middleware
jobRoute.use(auth);

//protected routes
jobRoute.post("/createJob", createJob);
module.exports = jobRoute;
