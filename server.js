import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Routes/User.js";
import ProductRouter from "./Routes/Product.js";
import CartRouter from "./Routes/Cart.js";
import AddressRouter from './Routes/Address.js'
import cors from 'cors';

// Initialize express
const app = express();


// Body parser (Express built-in)
app.use(express.json());  // Use built-in JSON parsing middleware


app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// Home testing route
app.get('/', (req, res) => res.json({ message: "This is the home route" }));

// User router
app.use('/api/user', UserRouter);

// Product router
app.use('/api/products', ProductRouter);

// cart Router
app.use('/api/cart', CartRouter);
// address Router
app.use('/api/address',AddressRouter)

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://prk373737:yfqvqMWnl2YcMKAu@cluster0.1bw4g.mongodb.net/",
    {
      dbName: "The_AgriGoods",
     
      serverSelectionTimeoutMS: 5000,  // 5 seconds timeout for connection
      socketTimeoutMS: 45000,  // 45 seconds for socket timeout
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Set the port and start the server
const PORT = 1000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
