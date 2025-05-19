import express from 'express';
import { authAdminMiddleware, authMiddleware } from '../Middleware/auth.js';
import {addToCart,getAdminAllCarts,getUserCart,removeFromCart} from '../Controllers/cart.js';


const router = express.Router();
router.get("/all-carts", authAdminMiddleware, getAdminAllCarts);
router.post("/addcart", authMiddleware, addToCart);
router.get("/getcart",authMiddleware,getUserCart)
router.delete("/deletcart/:id", authMiddleware, removeFromCart);
export default router;