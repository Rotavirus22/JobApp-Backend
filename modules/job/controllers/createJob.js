const mongoose = require("mongoose");

const createJob = async (req, res) => {
  const userModel = mongoose.model("users");
  const jobModel = mongoose.model("job");

  //naming the variable constant to be used in the files.
  const {
    jobTitle,
    jobDescription,
    company,
    estimatedSalary,
    jobType,
    location,
  } = req.body;

  //validations of the schema
  if (!jobTitle) throw "Job title is required";
  if (!jobDescription) throw "Job description is required";
  if (!company) throw "company is required";
  if (!estimatedSalary) throw "Estimated Salary is required";
  if (!location) throw "Job Location is required";

  //creating the required schema which stores the data in the database once the req in the certain url is performed.
  await jobModel.create({
    user_id: req.user._id,
    job_title: jobTitle,
    job_description: jobDescription,
    company: company,
    estimated_salary: estimatedSalary,
    job_type: jobType,
    location: location,
  });

  //response status after the data is entered in the database.
  res.status(200).json({
    status: "success",
    message: "Job Created Successfully",
  });
};
module.exports = createJob;
