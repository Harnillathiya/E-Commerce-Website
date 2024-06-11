import mongoose from 'mongoose';

const allCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
});

export default mongoose.model('Allcategory', allCategorySchema);

