import express from 'express';
import { profile, register } from '../Controllers/User.js';
import { users } from '../Controllers/User.js';
import { login } from '../Controllers/User.js';
import { Authenticated } from "../Middleware/auth.js";
const router = express.Router();

// register   = /api/users/register
router.post('/register',register)       


// login
router.post('/login',login) 


// all user
router.get('/all',users)
// get user profile
router.get("/profile", Authenticated, profile);



export default router
