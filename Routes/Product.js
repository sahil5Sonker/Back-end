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
    getNewArrivalProducts
 
  } from "../Controllers/product.js";
import express from "express";
import {authAdminMiddleware} from "../Middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Multer configuration directly inside routes file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes




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





router.get("/bestseller", getBestSellers);            // Specific first
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
