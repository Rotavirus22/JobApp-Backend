const mongoose = require("mongoose");
const cloudinary = require("../../../utils/cloudinary");
const fs = require("fs");

const editImage = async (req, res) => {
  const userModel = mongoose.model("users");

  const { image } = req.body;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "failed", message: "No image uploaded" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { profile_picture: result.secure_url }
    );

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      status: "Success",
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = editImage;
