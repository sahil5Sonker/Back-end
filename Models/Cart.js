import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: String, required: true },
  title: { type: String, required: true },
  imgSrc: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});
export const Cart = mongoose.model("Cart", cartSchema);
