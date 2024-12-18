//Exporting the express, mongoose and whatever needed like other files

const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");
const editImage = require("./controllers/editImage");
const upload = require("../../middleware/multer");

//providing the routing query
const userRoute = express.Router();

//Routes

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/forgotPw", forgotPassword);
userRoute.post("/resetPw", resetPassword);

//middleware
userRoute.use(auth);

userRoute.post(
  "/uploadProfilePicture",
  upload.single("profilePicture"),
  editImage
);

//protected routes
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;
