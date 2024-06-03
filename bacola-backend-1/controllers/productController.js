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
        quantity: req.body.quntity,
    });
    console.log(req.body)
    try {
        await product.save();
        res.json({ success: true, message: "product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export const listProduct = async (req, res) => {
    const category = req.query.category;

    try {
        let products;
        if (category && category !== "All") {
            products = await Product.find({ category });
        } else {
            products = await Product.find({});
        }
        const processedProducts = products.map(product => {
            return {
                ...product._doc,
                status: product.quantity === 0 ? "Out of Stock" : "In Stock"
            };
        });

        res.json({ success: true, data: processedProducts });
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


