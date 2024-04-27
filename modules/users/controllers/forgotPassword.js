const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "Email must be provided";

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email doesn't belong in our system";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );
  await emailManager(
    email,
    "Your Password reset code is" + resetCode,
    "Your Password reset code is" + resetCode,
    "Reset your Password - QuantumHires"
  );

  res.status(200).json({
    status: "Success",
    message: "Reset code is sent",
  });
};
module.exports = forgotPassword;
