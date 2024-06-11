import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRouter from "./routes/Cart.js";
import orderRoutes from './routes/order.js';
import paymentRouter from "./routes/payment.js";
// import categoryRouter from "./routes/Allcategory.js";
import allCategoryRouter from "./routes/Allcategory.js";
import ratingRoutes from "./routes/rating.js";
import Razorpay from "razorpay";

dotenv.config();

const app = express();
const Port = process.env.PORT || 9000;

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);
app.use('/api/products', productRoutes);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRouter);
app.use("/api/category", allCategoryRouter);
app.use('/api/ratings', ratingRoutes);



// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/bacola', {
        });
        console.log("MongoDB connection successful");
    } catch (err) {
        console.log("MongoDB connection failed:", err);
    }
};

app.get("/api/getkey", (req, res) =>
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen(Port, () => {
    connect();
    console.log('Server listening on port', Port);
});
