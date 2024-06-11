import Allcategory from "../models/Allcategory.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use. Please use a different email."
      });
    }
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (req.body.password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user, token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = req.headers.authorization;

  const decodeToken = jwt.decode(token);

  if (!decodeToken || !decodeToken.userId) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const id = decodeToken.userId;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.json(user);

    return user;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const addRatingToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { ratingId } = req.body;

    const user = await User.findById(userId);
    const rating = await Rating.findById(ratingId);

    if (!user || !rating) {
      return res.status(404).json({ message: 'User or Rating not found' });
    }

    if (!user.ratings.includes(ratingId)) {
      user.ratings.push(ratingId);
    }

    if (!rating.users.includes(userId)) {
      rating.users.push(userId);
    }

    await user.save();
    await rating.save();

    res.status(201).json({ message: 'Rating added to user successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('ratings');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.ratings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const adminCount = await User.countDocuments({ role: "admin" });
    const itemsCount = await Product.countDocuments({});
    const ordersCount = await Order.countDocuments({});

    const totalAmountAggregate = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalAmount = totalAmountAggregate.length > 0 ? totalAmountAggregate[0].totalAmount : 0;

    const allCategories = await Allcategory.find({}, 'name');

    const categoryData = await Promise.all(allCategories.map(async (category) => {
      const productCount = await Product.countDocuments({ category: category.name });
      const products = await Product.find({ category: category.name }, 'name rating'); // Modify this line to include rating
      return {
        name: category.name,
        productCount,
        products // Include products data including ratings
      };
    }));

    res.status(200).json({ success: true, userCount, adminCount, itemsCount, ordersCount, totalAmount, categories: categoryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
