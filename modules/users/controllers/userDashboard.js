const mongoose = require("mongoose");
const usersModel = require("../../../models/users.model");

//This file is used to get the user info which is to be used in the profile section
const userDashboard = async (req, res) => {
  const userModel = mongoose.model("users");

  const getUser = await usersModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");

  res.status(200).json({
    status: "Success",
    data: getUser,
  });
};
module.exports = userDashboard;
