const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name must be provided"],
  },
  email: {
    type: String,
    required: [true, "Email address must be provided"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
  },
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
