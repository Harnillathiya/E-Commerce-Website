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
        role:user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user, token, role:user.role });
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

    console.log(userId);
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