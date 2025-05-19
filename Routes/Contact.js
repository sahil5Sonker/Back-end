import express from "express";
import { submitContactForm, getAllMessages } from "../Controllers/contact.js";
import { authAdminMiddleware } from "../Middleware/auth.js"; // Ensure authentication

const router = express.Router();

router.post("/getuser", submitContactForm);  // ✅ User submits form
router.get("/getadmin", authAdminMiddleware ,getAllMessages);     // ✅ Admin fetches messages

export default router;
