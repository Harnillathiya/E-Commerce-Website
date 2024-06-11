import express from "express";
import { addRatingToUser, createUser, getAllStats, getToken, getUserRatings, login } from "../controllers/userController.js";


const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", getToken);
router.get("/alluser", getAllStats);
router.post('/:userId/ratings', addRatingToUser);
router.get('/:userId/ratings', getUserRatings);


export default router;
