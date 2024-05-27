import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/addTocartController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/addToCart", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/getCart", authMiddleware, getCart);

export default router;