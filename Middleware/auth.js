import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// 🟢 Middleware for **Authenticated Users**
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);    // ✅ FIXED

    if (!user) return res.status(404).json({ msg: "User Not Found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// 🟢 Middleware for **Admin-Only Access**
export const authAdminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No Token Provided!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = await User.findById(decoded.id);   // ✅ FIXED

    if (!userInfo) return res.status(404).json({ msg: "User Not Found" });

    if (userInfo.role !== 1) {
      return res.status(403).json({ msg: "Access Denied! Admins Only." });
    }

    req.user = userInfo;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
