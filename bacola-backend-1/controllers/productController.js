import Product from "../models/Product.js";
import fs from "fs";
import { getAllCategories } from "./allcategoryController.js";

export const addProduct = async (req, res) => {
    let image_filename = `${req.file?.filename}`;
    console.log(image_filename);
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
        quantity: req.body.quantity, 
    });

    try {
        await product.save();
        res.json({ success: true, message: "Product Added" });
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


export const getCategoryStats = async (req, res) => {
    try {
        const categoriesResponse = await getAllCategories();
        const categories = categoriesResponse.data.map(category => category.name);

        const categoryStats = await Promise.all(categories.map(async (category) => {
            const count = await Product.countDocuments({ category });
            return { category, count };
        }));
        res.json({ success: true, data: categoryStats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, quantity } = req.body;
    console.log( name, description, price, category, quantity , productId)

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.quantity = quantity;

        const updatedProduct = await product.save();
        
        res.json({ success: true, message: "Product updated", data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
