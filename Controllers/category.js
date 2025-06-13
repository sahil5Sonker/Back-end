import Category from "../Models/Category.js";
import Product from "../Models/Product.js";

// Create a Category
// Category Controller with better error handling and optimizations
export const createCategory = async (req, res) => {
  try {
    const { name, productData } = req.body;
    const image = req.file ? req.file.filename : null;

    // Create a new category
    const newCategory = new Category({ name, image });

    // Add products to the category
    if (productData && Array.isArray(productData)) {
      for (const product of productData) {
        // Create a new product and associate it with the category
        const newProduct = new Product({
          title: product.title,
          description: product.description,
          price: product.price,
          category: newCategory._id, // Link product to the newly created category
          quantity: product.quantity,
          image: product.image,
        });
        await newProduct.save(); // Save the product to the database
        newCategory.products.push(newProduct._id); // Link product to category
      }
    }

    await newCategory.save(); // Save the updated category with products

    // Send response with the category
    res.status(201).json({
      message: "Category created successfully with products",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    res.status(500).json({ message: error.message });
  }
};





// Fetching products by category ID
export const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId).populate("products");

    if (!category || category.products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json({ success: true, products: category.products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Unassign a product from a category
export const unassignProductFromCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req.body;

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Find the product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove the product from the category's products array
    category.products = category.products.filter((id) => id.toString() !== productId);
    await category.save(); // Save the updated category

    res.status(200).json({
      message: "Product unassigned from category successfully",
      category: category, // Return the updated category without the unassigned product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Assign a product to a category
export const assignProductToCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req.body;

    // Find the category
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Find the product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if the product is already assigned to the category
    if (!category.products.includes(productId)) {
      // Add the product to the category's products array
      category.products.push(productId);
      await category.save(); // Save the updated category
    }

    res.status(200).json({
      message: "Product assigned to category successfully",
      category: category, // Return the updated category with the assigned product
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// export const getProductsByCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.categoryId;
//     const products = await Product.find({ category: categoryId }); // Assuming 'category' field in Product
//     res.status(200).json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
// Fetch category by ID and populate its products
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Send the category with populated products
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
// export const assignProductToCategory = async (req, res) => {
//   try {
//     const { categoryId, productId } = req.body;

//     const category = await Category.findById(categoryId);
//     if (!category) return res.status(404).json({ message: "Category not found" });

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // Add product to category if not already assigned
//     if (!category.products.includes(productId)) {
//       category.products.push(productId);
//       await category.save();
//     }

//     res.status(200).json({ message: "Product assigned to category", category });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
