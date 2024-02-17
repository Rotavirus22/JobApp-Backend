const mongoose = require("mongoose");
const jobModel = require("../../../models/job.model");
const applyModel = require("../../../models/apply.model");

const applyJob = async (req, res) => {
  const jobModel = mongoose.model("job");
  const applyModel = mongoose.model("applies");

  const { job_id, cover_letter, expected_Salary } = req.body;

  if (!job_id) throw "Job id must be provided";
  if (!cover_letter) throw "coverletter must be provided";
  if (!expected_Salary) throw "expectedsalary must be provided";

  try {
    const existingApplication = await applyModel.findOne({
      user_id: req.user._id,
      job_id: job_id,
    });

    if (existingApplication) {
      return res.status(400).json({
        status: "failed",
        message: "You have already applied for this job",
      });
    }
    const job = await jobModel.findById(job_id);

    if (!job) {
      return res.status(404).json({
        status: "Error",
        message: "Job not found",
      });
    }

    if (job.user_id == req.user._id) {
      return res.status(400).json({
        status: "Failed",
        message: "You can't apply to the job you created",
      });
    }

    const apply = await applyModel.create({
      user_id: req.user._id,
      job_id: job_id,
      cover_letter: cover_letter,
      expected_salary: expected_Salary,
    });
    res.status(200).json({
      status: "Success",
      message: "Job has been successfully applied",
    });
  } catch (e) {
    console.error(error);
    res.status(500)({
      status: "Error",
      message: "Internal Server error",
    });
  }
};
module.exports = applyJob;
