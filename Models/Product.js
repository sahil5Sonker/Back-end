// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String, required: true, trim: true },
//     price: { type: Number, required: true },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     quantity: { type: Number, required: true, min: 0 },
//     image: { type: String, required: true },

//     isBestSeller: { type: Boolean, default: false },
//     isFeatured: { type: Boolean, default: false },

//     // Special Offer Fields
//     isSpecialOffer: { type: Boolean, default: false },
//     discount: { type: Number, default: 0 }, 
//     discountExpiry: { type: Date, default: null },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  quantity: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  isBestSeller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isSpecialOffer: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  discountExpiry: { type: Date, default: null },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;

