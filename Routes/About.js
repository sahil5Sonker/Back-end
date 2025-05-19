import express from "express";
import { authAdminMiddleware } from "../Middleware/auth.js";
import { getAbout, updateAbout } from "../Controllers/about.js";


const router = express.Router();

// ✅ Public: Get About Page
router.get("/getabout", getAbout);

// ✅ Admin: Update About Page
router.put("/getaboutadmin", authAdminMiddleware, updateAbout);

export default router;
