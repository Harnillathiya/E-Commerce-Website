import express from "express";
import {  listOrders, productStatus } from "../controllers/orderController.js";


const router = express.Router();

router.get('/list', listOrders)
router.post('/status', productStatus);


export default router;