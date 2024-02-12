const applyJob = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "This is the apply job portal",
  });
};
module.exports = applyJob;
