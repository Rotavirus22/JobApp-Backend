const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    job_title: {
      type: String,
      required: [true, "Job title is required"],
    },
    job_description: {
      type: String,
      required: [true, "Job Description is required"],
    },
    company: {
      type: String,
      required: [true, "Comapny is required"],
    },
    estimated_salary: {
      type: String,
      required: [true, "Estimated Salary is required"],
    },
    job_type: {
      type: String,
      required: false,
      enum: ["FullTime, PartTime"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
