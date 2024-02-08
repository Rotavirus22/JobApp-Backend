const getJob = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is a get job page",
  });
};
module.exports = getJob;
