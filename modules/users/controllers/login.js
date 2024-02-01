const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email doesnot exist in our system";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and password donot match";

  const accessToken = jsonwebtoken.sign(
    {
      _id: getUser._id,
      name: getUser.fullName,
    },
    process.env.jwt_salt
  );

  res.status(200).json({
    status: "success",
    message: "User Logged in successfully",
    accessToken: accessToken,
  });
};

module.exports = login;
