const mongoose = require("mongoose");

const getApplyByUser = async (req, res) => {
  const applyModel = mongoose.model("applies");

  try {
    const jobData = await applyModel.find({
      user_id: req.params.user_id,
    });

    if (!jobData || jobData.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No applications found for the specified user",
      });
    }

    res.status(200).json({
      status: "Success",
      data: jobData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};
module.exports = getApplyByUser;
