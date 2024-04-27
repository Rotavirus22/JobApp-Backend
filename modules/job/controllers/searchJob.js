const mongoose = require("mongoose");

const searchJob = async (req, res) => {
  const jobModel = mongoose.model("job");
  try {
    const { title, company, location } = req.query;

    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (location) query.location = new RegExp(location, "i");
    if (company) query.company = new RegExp(company, "i");

    const job = await jobModel.find(query);

    res.status(200).json({
      success: true,
      count: job.length,
      data: job,
    });
  } catch (error) {
    console.error("Error searching jobs:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
module.exports = searchJob;
