import express from "express";
import multer from "multer";
import path from "path";
import { authAdminMiddleware } from "../Middleware/auth.js";

// Cloudinary setup import
import storage from "../helper/cloudinary.js";

// Controllers
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByCategory,
  updateProduct,
  getSpecialOfferById,
  updateSpecialOffer,
  deleteSpecialOffer,
  createBestSeller,
  getBestSellerById,
  updateBestSeller,
  deleteBestSeller,
  searchProducts,
  getAllSpecialOffers,
  getBestSellers,
  createSpecialOffer,
  getNewArrivalProducts,
} from "../Controllers/product.js";

const router = express.Router();

// Multer configuration using Cloudinary Storage
const upload = multer({ storage });

// Create product (upload single image here)
router.put("/update/:id", authAdminMiddleware, upload.single("image"), updateProduct);

router.post("/add", authAdminMiddleware, upload.single("image"), createProduct);

// Fetch all products under a specific category
router.get("/category/:categoryId", getProductsByCategory);

// Get all products
router.get("/get", getAllProducts);

// Add this route
router.get("/search", searchProducts);

// Get a single product by id

// Delete a product
router.delete("/:id", authAdminMiddleware, deleteProduct);

router.get("/bestseller", getBestSellers);  // Specific first
router.post("/bestseller/create", createBestSeller);
router.delete("/bestseller/delete/:id", deleteBestSeller);
router.get("/bestseller/:id", getBestSellerById);
router.put("/bestseller/update/:id", updateBestSeller);

// Get all special offers
router.post("/specialoffer/create", authAdminMiddleware, createSpecialOffer);   

router.get("/specialoffer", getAllSpecialOffers); // ✅ new recommended route

// Get specific special offer
router.get("/specialoffer/:id", authAdminMiddleware, getSpecialOfferById);

// Update
router.put("/specialoffer/update/:id", authAdminMiddleware, updateSpecialOffer);

// Delete
router.delete("/specialoffer/delete/:id", authAdminMiddleware, deleteSpecialOffer);

router.get('/new-arrivals', getNewArrivalProducts);

router.get("/:id", getProductById);

export default router;
