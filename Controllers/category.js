import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

// Create a Category
export const createCategory = async (req, res) => {
  try {
    const { name, productData } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create new category
    const newCategory = new Category({
      name,
      image, // <-- this was missing
    });

    // Save the category first
    await newCategory.save();

    // Create products and assign them to the category
    if (productData && Array.isArray(productData)) {
      for (const product of productData) {
        const newProduct = new Product({
          name: product.name,
          price: product.price,
          description: product.description,
        });

        await newProduct.save();
        newCategory.products.push(newProduct._id);
      }

      await newCategory.save();
    }

    res.status(201).json({
      message: "Category created successfully with products",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ category: categoryId }); // Assuming 'category' field in Product
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("products");
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Single Category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedFields = { name };
    if (image) {
      updatedFields.image = image;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  
// Delete a Category
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Product to Category
export const assignProductToCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Add product to category if not already assigned
    if (!category.products.includes(productId)) {
      category.products.push(productId);
      await category.save();
    }

    res.status(200).json({ message: "Product assigned to category", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
