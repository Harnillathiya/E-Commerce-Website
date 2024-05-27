import express from "express";
import { createUser, getToken, login } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", getToken);


export default router;
