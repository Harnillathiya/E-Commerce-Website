import Order from "../models/Order.js";

export const productStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        let updateQuery = { status: status };

        if (status === 'Accepted') {
            updateQuery = { ...updateQuery, acceptedAt: Date.now() };
        } else if (status === 'Rejected') {
            await Order.findByIdAndDelete(orderId); 
            return res.json({ success: true, message: "Order Rejected" });
        }

        await Order.findByIdAndUpdate(orderId, updateQuery);

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export const listOrders = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let filter = {};

        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        const orders = await Order.find(filter);
        console.log(orders);
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};
