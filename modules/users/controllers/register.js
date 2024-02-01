const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { fullName, email, password, confirm_password } = req.body;

  //validations
  if (!fullName) throw "Full name must be provided";
  if (!password) throw "Password must be provided";
  if (!email) throw "Email must be provided";
  if (password.length < 5) throw "Password must be more than 5 characters";

  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "Email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  await usersModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "User registered successfully !!",
  });
};

module.exports = register;
