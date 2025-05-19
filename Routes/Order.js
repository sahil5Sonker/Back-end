import express from "express";
import { authMiddleware } from "../Middleware/auth.js"; // Ensure authentication
import { allOrders, userOrders } from "../Controllers/order.js";

const router = express.Router();

// ✅ Admin - Get all orders
router.get("/orders", authMiddleware, allOrders);

// ✅ User - Get only logged-in user's orders
router.get("/user/orders", authMiddleware, userOrders);

export default router;
