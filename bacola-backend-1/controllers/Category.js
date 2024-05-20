import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList) {
            return res.status(500).json({ success: false });
        }
        res.status(200).json(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export const createCategory = async (req, res) => {
    let image_filename = `${req.file?.filename}`;
    console.log(image_filename);
    try {
        const { name, color } = req.body;
       
        const category = new Category({
            name:req.body.name,
            color:req.body.color,
            images:image_filename
        });

        await category.save();
        res.status(201).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
