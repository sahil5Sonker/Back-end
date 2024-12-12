import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  qty: { type: String, require: true },
  imgSrc: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  phoneNumber: { type: String,},
  country : { type: String, require: true},
  region:{ type: String, require: true},

});

export const Products = mongoose.model("Products",productSchema)