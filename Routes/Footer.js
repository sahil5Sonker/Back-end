import express from 'express';
import { updateFooter } from '../Controllers/footer.js';
import { getFooter } from '../Controllers/footer.js';
import { authAdminMiddleware } from '../Middleware/auth.js';

const router = express.Router();
// If you later want to protect admin routes:
// import { adminAuth } from '../middleware/adminAuth.js';

router.get('/getfooter', getFooter);   // GET /api/footer
// Admin PUT route to update footer
// router.put('/', adminAuth, updateFooter);  // with protection
router.put('/updatefooter',authAdminMiddleware, updateFooter);               // without protection for no

export default router;
