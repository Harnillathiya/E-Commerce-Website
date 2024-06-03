import { instance } from "../index.js";
import Order from "../models/Order.js";
import crypto from 'crypto';
import Payment from "../models/Payment.js";



export const checkout = async (req, res) => {
    try {
        const amount = Number(req.body.orderDataAmount * 100);
        if (isNaN(amount) || amount <= 0) {
            throw new Error("Invalid order amount");
        }

        const options = {
            amount: amount,
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        res.json({ success: true, data: order });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            const { address, items, amount } = orderData;
            const userId = req.user._id;
            console.log(orderData);
            await Order.create({
                userId,
                address,
                items,
                amount,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                payment: true,
            });

            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};
