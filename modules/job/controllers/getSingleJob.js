const mongoose = require("mongoose");

const getSingleJob = async (req, res) => {
  const jobModel = mongoose.model("job");

  const job_id = req.params;

  const jobData = await jobModel.findOne({
    _id: req.params.job_id,
  });
  res.status(200).json({
    status: "success",
    data: jobData,
  });
};
module.exports = getSingleJob;
