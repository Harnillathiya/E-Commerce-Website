import Product from "../models/Product.js";
import fs from "fs";


export const addProduct = async (req, res) => {
    let image_filename = `${req.file?.filename}`;
    console.log(image_filename);
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await product.save();
        res.json({ success: true, message: "product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
        if (product) {
            fs.unlink(`uploads/${product.image}`, () => { });
            await Product.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Product removed" });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};