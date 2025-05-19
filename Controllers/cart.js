// import Cart from "../Models/Cart.js";
// import Product from "../Models/Product.js";


import mongoose from "mongoose";
import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";
import Order from "../Models/Order.js";



export const getAdminAllCarts = async (req, res) => {
  try {
    // ✅ Populate user and product details
    const carts = await Cart.find().populate({
      path: "user",
      select: "name email", // Exclude password
    }).populate({
      path: "products.product",
      select: "title price image",
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ msg: "No carts found" });
    }

    return res.status(200).json({ msg: "User carts fetched successfully", carts });
  } catch (error) {
    console.error("❌ Error fetching carts:", error);
    return res.status(500).json({ msg: "Error fetching carts" });
  }
};
/** ✅ Add Product to Cart */
export const addToCart = async (req, res) => {
  try {
    console.log("🔥 Incoming Body:", req.body);
    console.log("🧑 User from Token:", req.user);

    const userId = req.user._id;
    let { productId, quantity } = req.body;

    console.log("📦 productId:", productId);
    console.log("🔢 quantity:", quantity);

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid product ID format." });
    }

    quantity = Number(quantity);
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ msg: "Quantity must be a positive number." });
    }

    // ✅ Find product
    const productInfo = await Product.findById(productId);
    console.log("🧾 Product Info:", productInfo);

    if (!productInfo) {
      return res.status(400).json({ msg: "Product not found." });
    }

    const pricePerUnit = Number(productInfo.price);
    if (isNaN(pricePerUnit) || pricePerUnit <= 0) {
      return res.status(400).json({ msg: "Invalid product price." });
    }

    const itemPrice = quantity * pricePerUnit;

    let cart = await Cart.findOne({ user: userId });

    // Create new cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
        totalAmount: 0,
      });
    }

    // Ensure products is an array
    if (!Array.isArray(cart.products)) {
      cart.products = [];
    }

    // Check if product already exists in cart
    const existingIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex > -1) {
      // Update existing product
      cart.products[existingIndex].quantity = quantity;
      cart.products[existingIndex].price = itemPrice;
    } else {
      // Add new product
      cart.products.push({
        product: productId,
        quantity,
        price: itemPrice,
      });
    }

    // Recalculate totalAmount
    cart.totalAmount = cart.products.reduce(
      (acc, curr) => acc + (curr.price || 0),
      0
    );

    console.log("💰 Calculated Total Amount:", cart.totalAmount);

    if (isNaN(cart.totalAmount) || cart.totalAmount < 0) {
      return res.status(400).json({ msg: "Invalid total amount calculation." });
    }

    await cart.save();

    // Populate product details for response
    const updatedCart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price image",
    });

    return res.status(200).json({
      msg: "Added to cart",
      data: updatedCart,
    });
  } catch (error) {
    console.error("❌ Add to cart error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

/** ✅ Get User's Cart */
/** ✅ Get User's Cart with fixed image URLs */
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;

    // ✅ Find the cart and populate product details
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price image",
    });

    if (!cart) {
      return res.status(404).json({ msg: "Cart is empty." });
    }

    // ✅ Fix image path using base URL from environment or default
    const baseURL = process.env.BASE_URL || "http://localhost:5000";

    const updatedProducts = cart.products.map((item) => {
      const product = item.product || {};
      const imagePath = product.image || "";

      const fixedImage =
        imagePath.startsWith("http") || imagePath.startsWith("https")
          ? imagePath
          : `${baseURL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;

      return {
        ...item._doc,
        product: {
          ...product._doc,
          image: fixedImage,
        },
      };
    });

    return res.status(200).json({
      msg: "My Cart",
      data: {
        ...cart._doc,
        products: updatedProducts,
      },
    });
  } catch (error) {
    console.error("❌ Get cart error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



/** ✅ Remove Product from Cart */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: productId } = req.params; // ✅ Get productId from URL params

    // ✅ Validate `productId`
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid productId format." });
    }

    // ✅ Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found for this user." });
    }

    // ✅ Check if the product exists in the cart
    const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ msg: "Product not found in cart." });
    }

    // ✅ Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // ✅ Recalculate total amount
    cart.totalAmount = cart.products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // ✅ Save the updated cart
    await cart.save();

    return res.status(200).json({
      msg: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

/** ✅ Checkout & Create Order */
export const initiateCheckout = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    console.log("User ID:", userId);

    // ✅ Check if the user has a cart
    const cartInfo = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      select: "title description price image",
    }).lean();

    console.log("Cart Info:", cartInfo);

    if (!cartInfo) {
      return res.status(400).json({ msg: "No cart found. Add items before checkout." });
    }

    if (!cartInfo.products || cartInfo.products.length === 0) {
      return res.status(400).json({ msg: "Cart is empty. Add items before checkout." });
    }

    // ✅ Extract user details from request body
    const { paymentType, firstName, lastName, address, address2, city, state, zip } = req.body;

    // ✅ Validate required fields
    if (!paymentType || !firstName || !address || !city || !state || !zip) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    // ✅ Create the order
    const order = await Order.create({
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

    return res.status(200).json({
      msg: "Order initiated successfully",
      data: { orderId: order._id },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

