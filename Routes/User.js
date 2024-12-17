import express from 'express';

import { Authenticated } from '../Middleware/auth.js';
import { login, profile, register } from '../Controllers/User.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route (authenticated)
router.get('/profile', Authenticated, profile);

export default router;
