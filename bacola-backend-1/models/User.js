import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    ratings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }], 
    cartData: [cartItemSchema],
  },
  { minimize: false }
);

export default mongoose.model("User", userSchema);
