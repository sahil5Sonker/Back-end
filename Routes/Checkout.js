import express from "express";
import { confirmCheckout, initiateCheckout } from "../Controllers/checkout.js";
import {  authMiddleware  } from "../Middleware/auth.js"; // Ensure authentication

const router = express.Router();

// ✅ Checkout Route
router.post("/checkout", authMiddleware, initiateCheckout);
router.put("/checkout/:orderId", authMiddleware, confirmCheckout);

export default router;
