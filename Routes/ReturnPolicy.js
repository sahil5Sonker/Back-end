import express from "express";
import { authAdminMiddleware } from "../Middleware/auth.js";
import { getReturnPolicy, updateReturnPolicy } from "../Controllers/returnPolicyController.js";

const router = express.Router();

router.get("/getpolicy", getReturnPolicy); // ✅ Get Return & Refund Policy
router.put("/getpolicyadmin", authAdminMiddleware, updateReturnPolicy); // ✅ Admin Update Policy

export default router;
