import Allcategory from "../models/Allcategory.js";

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await Allcategory.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, error: 'Category already exists' });
        }
        const imagePath = req.file.path.replace(/^uploads\\/, '');
        const newCategory = new Allcategory({ name, image: imagePath });
        await newCategory.save();
        res.status(201).json({ success: true, message: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const removeCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        await Allcategory.findByIdAndDelete(categoryId);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error removing category:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Allcategory.find();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};















