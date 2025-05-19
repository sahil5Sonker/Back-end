import express from "express";
import { getImages, addImage, updateImage, deleteImage } from "../Controllers/imagecontroller.js";
import { authAdminMiddleware } from "../Middleware/auth.js";

const router = express.Router();

router.get("/get", getImages);
router.post("/add",authAdminMiddleware, addImage);
router.put("/:id",authAdminMiddleware,updateImage);
router.delete("/:id",authAdminMiddleware, deleteImage);

export default router;
