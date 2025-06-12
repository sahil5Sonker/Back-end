import express from "express";
import { addImage, getAllImages, getImageById, updateImage, deleteImage, upload } from "../Controllers/image.js";  // Import the controller functions

const router = express.Router();

// Routes
router.post("/add", upload.single("image"), addImage); // Add image route, ensure upload is used as middleware
router.get("/get", getAllImages); // Get all images
router.get("/:id", getImageById); // Get a single image by ID
router.put("/update/:id", upload.single("image"), updateImage); // Update image

router.delete("/:id", deleteImage); // Delete image

export default router;
