//Exporting the express, mongoose and whatever needed like other files

const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");

//providing the routing query
const userRoute = express.Router();

//Routes

userRoute.post("/register", register);
userRoute.post("/login", login);

//middleware
userRoute.use(auth);

//protected routes
userRoute.get("/dashboard", userDashboard);

module.exports = userRoute;
