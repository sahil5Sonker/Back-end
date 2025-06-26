import Product from "../Models/Product.js";
import Category from "../Models/Category.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product');  // Store files in 'uploads/product' (remove 'public' if necessary)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const createProduct = async (req, res) => {
  try {
    const { title, description, category, quantity, price, isBestSeller, isFeatured, discount, discountExpiry } = req.body;
    const image = req.file?.path;

    if (!image) {
      return res.status(400).json({ message: "Product image is required" });
    }

    // Ensure the category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid Category ID" });
    }

    // Create the product
    const product = new Product({
      title,
      description,
      category,
      quantity,
      price,
      image,
      isBestSeller,
      isFeatured,
      discount,
      discountExpiry,
    });

    const savedProduct = await product.save();  // Save the product to DB

    // Update the category's products array with the new product ID
    categoryExists.products.push(savedProduct._id);
    await categoryExists.save();  // Save the updated category

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, category, quantity,price } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedFields = {
      title,
      description,
      category,
      quantity,
      price,
    };

    if (image) {
      updatedFields.image = image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    res.json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    // Handle multiple product filter types
    if (type === "specialoffer") {
      filter.isSpecialOffer = true;
    } else if (type === "bestseller") {
      filter.isBestSeller = true;
    } else if (type === "newarrival") {
      filter.isNewArrival = true; // if you plan to add it later
    }

    const products = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};
// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products by category",
      error: error.message,
    });
  }
};

// Create special offer
export const createSpecialOffer = async (req, res) => {
  try {
    const { productId, discount, discountExpiry } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.isSpecialOffer = true;
    product.discount = discount;
    product.discountExpiry = discountExpiry;
    await product.save();

    res.status(200).json({ message: "Special offer added", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const getAllSpecialOffers = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;   // ✅ add this
    const products = await Product.find({ isSpecialOffer: true }).limit(limit);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get special offer by ID
export const getSpecialOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.isSpecialOffer)
      return res.status(404).json({ message: "Special offer not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update special offer
export const updateSpecialOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { discount, discountExpiry } = req.body;
    const product = await Product.findById(id);
    if (!product || !product.isSpecialOffer)
      return res.status(404).json({ message: "Special offer not found" });

    product.discount = discount !== undefined ? discount : product.discount;
    product.discountExpiry = discountExpiry !== undefined ? discountExpiry : product.discountExpiry;
    await product.save();

    res.status(200).json({ message: "Special offer updated", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete special offer
export const deleteSpecialOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.isSpecialOffer)
      return res.status(404).json({ message: "Special offer not found" });

    product.isSpecialOffer = false;
    product.discount = 0;
    product.discountExpiry = null;
    await product.save();

    res.status(200).json({ message: "Special offer removed", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;  // ✅ allow optional limit
    const products = await Product.find({ isBestSeller: true }).limit(limit);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const createBestSeller = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("Received productId:", productId); // debug

    const product = await Product.findById(productId);
    if (!product) {
      console.log("❌ Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    product.isBestSeller = true;
    await product.save();
    console.log("✅ Product updated:", product);

    res.status(200).json({ message: "Product marked as best seller", product });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getBestSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.isBestSeller)
      return res.status(404).json({ message: "Best seller not found" });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateBestSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity } = req.body;

    const product = await Product.findById(id);
    if (!product || !product.isBestSeller)
      return res.status(404).json({ message: "Best seller not found" });

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.quantity = quantity ?? product.quantity;

    await product.save();
    res.status(200).json({ message: "Best seller product updated", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unmark best seller
export const deleteBestSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product || !product.isBestSeller)
      return res.status(404).json({ message: "Best seller not found" });

    product.isBestSeller = false;
    await product.save();

    res.status(200).json({ message: "Product unmarked as best seller", product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get latest added products
export const getNewArrivalProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10); // latest 10
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch new arrival products' });
  }
};
