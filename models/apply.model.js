const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: [true, "Job id is required"],
    },
    expected_salary: {
      type: String,
      required: [true, "expected salary is required"],
    },
    cover_letter: {
      type: String,
      required: [true, "Cover letter is required"],
    },
  },
  { timestamps: true }
);

const applyModel = mongoose.model("applies", applySchema);

module.exports = applyModel;
