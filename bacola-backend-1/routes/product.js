import express from "express";
import multer from "multer";
import { addProduct, getCategoryStats, listProduct, removeProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addProduct);
router.get("/list", listProduct);
router.post("/remove", removeProduct);
router.get('/category-stats', getCategoryStats);
router.post('/updateProduct/:id', updateProduct);

export default router;