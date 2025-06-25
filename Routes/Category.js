import express from "express";
import multer from "multer";
import path from "path";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  assignProductToCategory,
  getProductsByCategory,
  unassignProductFromCategory,
} from "../Controllers/category.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads/category/' directory exists
    cb(null, 'uploads/category/');  // This directory must exist on the server
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Creating unique filenames
  }
});


const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), createCategory); // Now handle image upload
router.get("/get", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/update/:id", upload.single("image"), updateCategory); // Also allow updating image
router.delete("/delet/:id", deleteCategory);
router.get("/products/:categoryId", getProductsByCategory);

router.post("/assign-product", assignProductToCategory);
router.post("/unassign-product", unassignProductFromCategory); // New route for unassign-product


router.post("/assign-product", assignProductToCategory);

export default router;
