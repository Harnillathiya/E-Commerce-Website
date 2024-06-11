import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

export default mongoose.model('Rating', ratingSchema);
