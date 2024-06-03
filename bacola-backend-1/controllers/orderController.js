import Order from "../models/Order.js";

export const productStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body; 
        await Order.findByIdAndUpdate(orderId, {
            status: status,
        });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log(orders);
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};