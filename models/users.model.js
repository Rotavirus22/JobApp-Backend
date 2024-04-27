const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name must be provided"],
    },
    email: {
      type: String,
      required: [true, "Email address must be provided"],
      unique: true,
    },
    workPosition: {
      type: String,
      required: [true, "Work Position must be provided"],
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    reset_code: {
      type: Number,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
