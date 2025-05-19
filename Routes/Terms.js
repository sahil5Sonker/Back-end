import express from "express";
import { getTerms, updateTerms } from "../Controllers/terms.js";
import { authAdminMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// 📌 Get Terms & Conditions
router.get("/getterms", getTerms);

// 📌 Update Terms & Conditions (Admin Only)
router.post("/update",authAdminMiddleware, updateTerms);

export default router;
