const userDashboard = (req, res) => {
  res.status(200).json({
    status: "Hello from UserDashboard",
  });
};
module.exports = userDashboard;
