import Rating from "../models/Rating.js";
import Product from '../models/Product.js';
import User from '../models/User.js';
export const createRating = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, score, comment } = req.body;
        if (!productId || !userId || !score) {
            return res.status(400).json({ error: 'Product ID, User ID, and Score are required' });
        }
        const rating = new Rating({ productId, userId, score, comment });
        await rating.save();
        res.status(201).json({ success: true, message: "rating Added" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error" });
    }
};

export const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({});
        const combinedData = [];
        for (const rating of ratings) {
            const product = await Product.findById(rating.productId);
            const user = await User.findById(rating.userId)
            if (product) {
                const combinedItem = {
                    source: rating.score,
                    userName: user.username,
                    productName: product.name
                };
                combinedData.push(combinedItem);
            }
        }
        res.status(200).json({ ratings: combinedData });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error fetching ratings" });
    }
};


export const getAverageRatingByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const ratings = await Rating.find({ productId });

        if (ratings.length === 0) {
            return res.status(200).json({ averageRating: 0 });
        }

        const totalScore = ratings.reduce((sum, rating) => sum + rating.score, 0);
        const averageRating = totalScore / ratings.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error calculating average rating" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Rating.find().populate({
            path: 'userId',
            select: 'email',
            model: User
        }).populate({
            path: 'productId',
            select: 'productName',
            model: Product
        });

        const formattedReviews = reviews.map(review => ({
            userEmail: review.userId.email,
            productName: review.productId.productName,
            rating: review.rating,
            score: review.score
        }));

        res.status(200).json({ success: true, reviews: formattedReviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

