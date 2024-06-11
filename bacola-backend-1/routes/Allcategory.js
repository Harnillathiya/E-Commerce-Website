import express from "express";
import multer from "multer";
import { addCategory, getAllCategories, removeCategory } from "../controllers/allcategoryController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addCategory);
router.delete('/remove/:categoryId', removeCategory);
router.get('/all', getAllCategories);

export default router;


















