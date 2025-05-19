import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 50,
      default: "NULL",
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      default: "NULL",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Initiated", "Pending", "Processing", "Cancelled", "Completed"],
      required: true,
      default: "Initiated",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
