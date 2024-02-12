const mongoose = require("mongoose");

const getJobByUser = async (req, res) => {
  const jobModel = mongoose.model("job");

  try {
    const jobData = await jobModel.find({
      user_id: req.params.user_id,
    });

    res.status(200).json({
      status: "Success",
      data: jobData,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "failed to retrieve jobs",
    });
  }
};
module.exports = getJobByUser;
