import express from "express";
import { addToCart, clearCart, decreaseProudctQty, removeProductFromCart, userCart } from "../Controllers/cart.js";
import { Authenticated } from '../Middleware/auth.js';
 const router = express.Router();

// add To cart
router.post('/add',Authenticated,addToCart)

// get User Cart
router.get("/user", Authenticated, userCart);

// remove product from cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// clear cart
router.delete("/clear", Authenticated, clearCart);

// decrease items qty
router.post("/--qty", Authenticated, decreaseProudctQty);

export default router;