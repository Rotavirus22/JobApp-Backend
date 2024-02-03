const mongoose = require("mongoose");
const usersModel = require("../../../models/users.model");

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
