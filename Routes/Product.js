import express from "express";
import multer from "multer";
import path from "path";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByCategory,
  updateProduct,
  searchProducts,
  createSpecialOffer,
  getAllSpecialOffers,
  updateSpecialOffer,
  deleteSpecialOffer,
  createBestSeller,
  getBestSellerById,
  updateBestSeller,
  deleteBestSeller,
  getNewArrivalProducts,
  getSpecialOfferById,
  getBestSellers
} from "../Controllers/product.js";
import { authAdminMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage });

// Routes for CRUD operations on products
router.post("/add", authAdminMiddleware, upload.single("image"), createProduct); // Create product
router.put("/update/:id", authAdminMiddleware, upload.single("image"), updateProduct); // Update product
router.get("/get", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get product by ID
router.delete("/:id", authAdminMiddleware, deleteProduct); // Delete product

// Search products
router.get("/search", searchProducts); // Search products by title

// Product by category
router.get("/category/:categoryId", getProductsByCategory);

// Special offers and best sellers routes
router.post("/specialoffer/create", authAdminMiddleware, createSpecialOffer); // Create special offer
router.get("/specialoffer", getAllSpecialOffers); // Get all special offers
router.get("/specialoffer/:id", authAdminMiddleware, getSpecialOfferById); // Get special offer by ID
router.put("/specialoffer/update/:id", authAdminMiddleware, updateSpecialOffer); // Update special offer
router.delete("/specialoffer/delete/:id", authAdminMiddleware, deleteSpecialOffer); // Delete special offer

// Best sellers
router.post("/bestseller/create", createBestSeller); // Create best seller
router.get("/bestseller", getBestSellers); // Get all best sellers
router.get("/bestseller/:id", getBestSellerById); // Get best seller by ID
router.put("/bestseller/update/:id", updateBestSeller); // Update best seller product
router.delete("/bestseller/delete/:id", deleteBestSeller); // Delete best seller product

// Get new arrival products
router.get('/new-arrivals', getNewArrivalProducts);

export default router;
