import express from 'express';
import { getAllCategories } from '../controllers/Category.js';
import { createCategory } from '../controllers/Category.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}${file.originalname}`);
    },
  });
  const upload = multer({ storage: storage });
router.get('/', getAllCategories);
router.post('/add',upload.single("image"),createCategory)

export default router;
