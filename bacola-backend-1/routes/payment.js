import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", authMiddleware, paymentVerification)
export default router;