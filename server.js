import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./Routes/User.js";
import ProductRouter from "./Routes/Product.js";
import CartRouter from "./Routes/Cart.js";
import AddressRouter from "./Routes/Address.js";

// Initialize dotenv to load variables from .env file
dotenv.config();

// Initialize express
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS with credentials support
app.use(
  cors({
    origin: [
      'http://theagrigoods.com',   // Allow http version
      'https://www.theagrigoods.com',  // Allow https version
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connection using environment variables
const dbURI = process.env.MONGO_URI;
const dbOptions = {
  dbName: "The_AgriGoods",
  serverSelectionTimeoutMS: 5000, // Timeout for DB connection
  socketTimeoutMS: 45000, // Socket timeout
};

// Connect to MongoDB
mongoose
  .connect(dbURI, dbOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/address", AddressRouter);

// Home route for testing
app.get("/", (req, res) => res.json({ message: "Welcome to The_AgriGoods API!" }));


// Set the port and start the server
const PORT = process.env.PORT || 1000; // Default to 1000 if not specified in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
