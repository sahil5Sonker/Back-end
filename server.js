import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url"; // Import fileURLToPath
import path from "path"; // Import path

// Routes
import categoryRoutes from "./Routes/Category.js";
import productRouter from "./Routes/Product.js";
import cartRouter from "./Routes/Cart.js";
import userRouter from "./Routes/auth.js";
import checkoutRouter from "./Routes/Checkout.js";
import AdminOrderRouter from "./Routes/Order.js";
import ImageRoutes from "./Routes/Image.js";
import AboutRoutes from "./Routes/About.js";
import ContactRoutes from "./Routes/Contact.js";
import ReturnPolicyRoutes from "./Routes/ReturnPolicy.js";
import TermsRoutes from "./Routes/Terms.js";

import footerRoutes from "./Routes/Footer.js";

dotenv.config();

const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS configuration
// CORS configuration
const corsOptions = {
  origin: [
    "https://www.theagrigoods.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// View engine
app.set("view engine", "ejs");

// ✅ API Routes
app.use("/api/category", categoryRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/check", checkoutRouter);
app.use("/api/adminorder", AdminOrderRouter);
app.use("/api/images", ImageRoutes);
app.use("/api/about", AboutRoutes);
app.use("/api/return", ReturnPolicyRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/terms", TermsRoutes);

// ✅ CORS test route
app.get("/api/test-cors", (req, res) => {
  res.json({ message: "CORS is working correctly" });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connection successful");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
