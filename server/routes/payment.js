const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

router.post("/order", async (req, res) => {
try {
    const options = {
        amount: 49900, // Rs. 499 in paise
        currency: "INR",
        receipt: "receipt_order_74394",
    };
    const order = await instance.orders.create(options);
    res.json(order);
} catch (err) {
    console.error(err);
    res.status(500).send("Error creating Razorpay order");
}
});

module.exports = router;