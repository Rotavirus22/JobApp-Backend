const { initializeKhaltiPayment, verifyKhaltiPayment } = require("./khalti");
const mongoose = require("mongoose");

const initializeKhalti = async (req, res) => {
  const usermodel = mongoose.model("users");
  try {
    const { website_url } = req.body;

    const totalPrice = 2000;
    const userId = req.user._id;
    const paymentInitiate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: userId, // purchase_order_id because we need to verify it later
      purchase_order_name: "Subscription",
      return_url: `${process.env.BACKEND_URI}/api/payments/complete-khalti-payment`,
      website_url,
    });

    res.status(200).json({
      success: true,
      payment: paymentInitiate,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = initializeKhalti;
