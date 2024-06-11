import express from 'express';
import { createRating, getAverageRatingByProductId, getRatings } from '../controllers/ratingController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createRating);
router.get('/getrating', getRatings);
router.get('/average/:productId', getAverageRatingByProductId);

export default router;
