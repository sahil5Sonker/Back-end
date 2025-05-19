import mongoose from "mongoose";
import Cart from "../Models/Cart.js";
import Order from "../Models/Order.js";

export const initiateCheckout = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);

    // ✅ Check if the user has a cart
    const cartInfo = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price image",
    });

    console.log("Cart Found:", cartInfo);

    if (!cartInfo) {
      return res.status(400).json({ msg: "No cart found. Add items before checkout." });
    }

    if (!cartInfo.products || cartInfo.products.length === 0) {
      return res.status(400).json({ msg: "Cart is empty. Add items before checkout." });
    }

    // ✅ Get user details from request
    const { paymentType, firstName, lastName, address, address2, city, state, zip } = req.body;

    // ✅ Validate required fields
    if (!paymentType || !firstName || !address || !city || !state || !zip) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    // ✅ Create new order
    const order = new Order({
      user: userId,
      products: cartInfo.products,
      totalAmount: cartInfo.totalAmount,
      paymentType,
      firstName,
      lastName,
      address,
      address2,
      city,
      state,
      zip,
      status: "Initiated",
    });

    // ✅ Save order to database
    await order.save();
    console.log("Order Created:", order);

    // ✅ Clear the cart after checkout
    await Cart.findOneAndDelete({ user: userId });

    return res.status(200).json({
      msg: "Order placed successfully",
      order: order, // ✅ Send order details
    });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const confirmCheckout = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { orderId } = req.params;

    // ✅ Find the order with status "Initiated"
    const orderInfo = await Order.findOne({ _id: orderId, user: userId, status: "Initiated" });
    if (!orderInfo) {
      return res.status(400).json({ msg: "Order not found or already processed." });
    }

    // ✅ Check if cart exists
    const cartInfo = await Cart.findOne({ user: userId });
    if (!cartInfo) {
      return res.status(400).json({ msg: "Cart not found for this user." });
    }

    // ✅ Update order status to "Pending"
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId }, // ✅ Search criteria
      { status: "Pending" }, // ✅ Fields to update
      { new: true } // ✅ Return the updated document
    );

    return res.status(200).json({
      msg: "Order confirmed successfully",
      data: updatedOrder,
    });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
