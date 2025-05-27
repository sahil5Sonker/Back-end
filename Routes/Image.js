import express from "express";
import {
  getImages,
  addImage,
  updateImage,
  deleteImage,
  upload, // multer middleware
} from "../Controllers/imagecontroller.js";

import { authAdminMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Public route
router.get("/get", getImages);

// Admin-only routes with image upload
router.post("/add", authAdminMiddleware, upload, addImage);
router.put("/:id", authAdminMiddleware, updateImage);
router.delete("/:id", authAdminMiddleware, deleteImage);

export default router;
