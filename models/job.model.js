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
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    job_nature: {
      type: String,
      enum: ["Part time", "Full time"],
    },
    end_date: {
      type: Date,
      required: [true, "End Date is required"],
    },
    job_status: {
      type: String,
      enum: ["Active", "Expired"],
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("job", jobSchema);

module.exports = jobModel;
