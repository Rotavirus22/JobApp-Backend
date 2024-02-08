//Exporting the express, mongoose and whatever needed like other files

const express = require("express");
const auth = require("../../middleware/auth");
const createJob = require("./controllers/createJob");
const getJob = require("./controllers/getJob");

//providing the routing query
//This provides the Express router which helps in maintaining the rouute.
const jobRoute = express.Router();

//middleware
//Using auth middleware which helps in determine whether the user has the valid accesstoken or not which helps in accessing the rules of the user.
jobRoute.use(auth);

//protected routes
//using it after the auth protects the route meaning if the valid user is not entering the details then the access is denied.
jobRoute.post("/createJob", createJob);
jobRoute.get("/getJob", getJob);

module.exports = jobRoute;
