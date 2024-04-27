const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, new_password, resetCode } = req.body;

  if (!email) throw "Email is required";
  if (!new_password) throw "New Password is required";
  if (!resetCode) throw "Reset code is required";

  if (new_password.length < 5) throw "Password must be of 5 characters";

  const getUserWithResetCode = await userModel.findOne({
    email: email,
    reset_code: resetCode,
  });

  if (!getUserWithResetCode) throw "Reset code doesn't match";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Password reseted Successfully",
    "Password reseted Successfully",
    "Succesful Password reset"
  );

  res.status(200).json({
    status: "Success",
    message: "Password reseted Successfully",
  });
};
module.exports = resetPassword;
