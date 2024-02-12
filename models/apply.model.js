const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    expected_salary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
