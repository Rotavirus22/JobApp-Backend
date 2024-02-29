//Exporting the express, mongoose and whatever needed like other files

const express = require("express");
const auth = require("../../middleware/auth");
const createJob = require("./controllers/createJob");
const getJob = require("./controllers/getJob");
const getSingleJob = require("./controllers/getSingleJob");
const getJobByUser = require("./controllers/getJobByUser");
const applyJob = require("./controllers/applyJob");
const getApplyByJob = require("./controllers/getApplyByjob");
const getApplyByUser = require("./controllers/getApplyByUser");
const upload = require("../../middleware/multer");

//providing the routing query
//This provides the Express router which helps in maintaining the rouute.
const jobRoute = express.Router();

//middleware
//Using auth middleware which helps in determine whether the user has the valid accesstoken or not which helps in accessing the rules of the user.
jobRoute.use(auth);

//protected routes
//using it after the auth protects the route meaning if the valid user is not entering the details then the access is denied.

// Applying upload middleware specifically to the /applyJob route
jobRoute.post("/applyJob", upload.single("pdf"), applyJob);

jobRoute.post("/createJob", createJob);
jobRoute.get("/", getJob);
jobRoute.get("/:job_id", getSingleJob);
jobRoute.get("/user/:user_id", getJobByUser);
jobRoute.get("/apply/jobs/:job_id", getApplyByJob);
jobRoute.get("/apply/users/:user_id", getApplyByUser);

module.exports = jobRoute;
