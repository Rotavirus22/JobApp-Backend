const express = require("express");
const auth = require("../../middleware/auth");
const initializeKhalti = require("./controllers/initializeKhalti");
const khaltiComplete = require("./controllers/khaltiComplete");

const paymentRoute = express.Router();

paymentRoute.use(auth);

paymentRoute.post("/initialize-khalti-subscription/", initializeKhalti);
paymentRoute.get("/complete-khalti-payment", khaltiComplete);
// paymentRoute.post("/khalti-subscription-callback", handleKhaltiCallbacks);

module.exports = paymentRoute;
