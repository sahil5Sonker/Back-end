// import express from 'express';
// import { deleteUser, getAdminAllUsers, getAllUsers, getUserProfile, login, signUp, updateUser } from '../Controllers/userController.js';
// import { authAdminMiddleware } from '../Middleware/auth.js';

// const router = express.Router();

// router.get("/admin/users", authAdminMiddleware, getAdminAllUsers);
//  router.get('/get-user', getAllUsers);

// router.get("/profile", getUserProfile);
//  router.delete('/delet-user/:id', deleteUser);
// router.post('/create-user', signUp);
// router.post('/login-user', login);
// router.put('/update-user/:id', updateUser); // 🆕 Added update user route


// export default router;

import express from "express";
import { 
  deleteUser, 
  getAdminAllUsers, 
  getAllUsers, 
  getUserProfile, 
  login, 
  signUp, 
  updateUser 
} from "../Controllers/userController.js";
import { authAdminMiddleware, authMiddleware } from "../Middleware/auth.js";
import { userOrders } from "../Controllers/order.js";

const router = express.Router();

// ✅ Correct Route for Admin to Fetch All Users
router.get("/admin/users", authAdminMiddleware, getAdminAllUsers);

// ✅ Other User Routes
router.get("/get-user", getAllUsers);
router.get("/profile",authMiddleware, getUserProfile);
router.delete("/delete-user/:id", deleteUser);
router.post("/create-user", signUp);
router.post("/login-user", login);
router.put("/update-user/:id", updateUser);
// ✅ Add this route
router.get("/orders", authMiddleware, userOrders);

export default router;
