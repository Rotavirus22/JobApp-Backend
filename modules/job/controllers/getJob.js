const mongoose = require("mongoose");

//This file helps to get every data which is posted in the database
const getJob = async (req, res) => {
  //acessing the database
  const userModel = mongoose.model("users");
  const jobModel = mongoose.model("job");

  //finding the data in the database
  const jobData = await jobModel.find({});
  res.status(200).json({
    status: "success",
    data: jobData,
  });
};
module.exports = getJob;
