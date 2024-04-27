const mongoose = require("mongoose");
const { verifyKhaltiPayment } = require("./khalti");

const khaltiComplete = async (req, res) => {
  const paymentModel = mongoose.model("payments");
  try {
    const { pidx, transaction_id } = req.query;

    const amount = 2000;

    const paymentInfo = await verifyKhaltiPayment(pidx);

    if (
      !paymentInfo ||
      paymentInfo.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    const payment = await paymentModel.create({
      pidx: pidx,
      transactionId: transaction_id,
      userId: req.user._id,
      amount: amount,
      status: "success",
    });

    res.status(200).json({
      status: true,
      message: "Payment Successfull",
    });
  } catch (e) {
    console.log(e);
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = khaltiComplete;
