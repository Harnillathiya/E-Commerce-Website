import User from "../models/User.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "Item ID is required" });
    }

    if (typeof quantity !== 'number' || quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ success: false, message: "Quantity must be a positive integer" });
    }

    const product = await Product.findById(itemId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || [];

    const existingItemIndex = cartData.findIndex(item => item.itemId.toString() === itemId.toString());

    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity += quantity;
    } else {
      cartData.push({
        itemId: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity,
      });
    }

    user.cartData = cartData;
    const updatedUser = await user.save();

    res.json({ success: true, message: "Added to cart successfully", cartData: updatedUser.cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || [];

    const filteredCartData = cartData.filter(item => item?.itemId?.toString() !== itemId?.toString());

    user.cartData = filteredCartData;
    const updatedUser = await user.save();

    res.json({ success: true, message: "Item removed from cart successfully", cartData: updatedUser.cartData });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, message: "Error removing item from cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || [];
    const productIds = cartData.map(item => item.itemId);
    const products = await Product.find({ _id: { $in: productIds } });

    const cartWithProductDetails = cartData.map(item => {
      const product = products.find(p => p._id.toString() === item.itemId.toString());
      return { ...item.toObject(), product };
    });

    res.json({ success: true, cartData: cartWithProductDetails });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};
