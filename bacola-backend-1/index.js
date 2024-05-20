import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import categoryRoutes from './routes/category.js';

dotenv.config();

const app = express();
const Port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', categoryRoutes);
app.use('/images', express.static("uploads"));

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

app.listen(Port, () => {
    connect();
    console.log('Server listening on port', Port);
});
