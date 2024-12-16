import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRouter from './Routes/User.js';
import CartRouter from './Routes/Cart.js';
import AddressRouter from './Routes/Address.js';

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Route handlers
app.use('/api/user', UserRouter);
app.use('/api/cart', CartRouter);
app.use('/api/address', AddressRouter);

// MongoDB connection
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/The_AgriGoods';
const dbOptions = {
  dbName: 'The_AgriGoods',
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(dbURI, dbOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Server setup
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
