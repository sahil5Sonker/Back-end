import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Routes/User.js";
import ProductRouter from "./Routes/Product.js";
import CartRouter from "./Routes/Cart.js";
import AddressRouter from './Routes/Address.js'
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize dotenv to load variables from .env file
dotenv.config();

// Initialize express
const app = express();

// Body parser (Express built-in)
app.use(express.json());  // Use built-in JSON parsing middleware

// Enable CORS
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(cors({
//   origin: 'https://theagrigoods.com/', // replace with your Hostinger domain
// }));

// Home testing route
app.get('/', (req, res) => res.json({ message: "This is the home route" }));

// User router
app.use('/api/user', UserRouter);

// Product router
app.use('/api/product', ProductRouter);

// Cart router
app.use('/api/cart',CartRouter)

// Address router
app.use('/api/address', AddressRouter);

// MongoDB connection using environment variables
const dbURI = process.env.MONGO_URI || "mongodb+srv://prk373737:yfqvqMWnl2YcMKAu@cluster0.1bw4g.mongodb.net/The_AgriGoods"; // Fallback to a default URI if not found in .env
const dbOptions = {
  dbName: "The_AgriGoods",
  serverSelectionTimeoutMS: 5000,  // 5 seconds timeout for connection
  socketTimeoutMS: 45000,  // 45 seconds for socket timeout
};

mongoose
  .connect(dbURI, dbOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Set the port and start the server
const PORT = process.env.PORT || 1000; // Fallback to 1000 if not set in .env

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
