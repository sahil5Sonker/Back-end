import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

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
import footerRoutes from './Routes/Footer.js';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static("uploads"));

// Optional: Set EJS if views are needed
app.set("view engine", "ejs");

// Routes
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

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
