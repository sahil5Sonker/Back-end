import multer from "multer"; // Image file handling with multer
import path from "path";
import fs from "fs"; // Import fs to create directories
import Image from "../Models/Images.js"; // Import your Image model

// Ensure the folder exists
const createFolderIfNotExist = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Create the folder if it doesn't exist
  }
};

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/images/";  // Define the folder to store images
    createFolderIfNotExist(uploadPath);  // Ensure the directory exists before saving files
    cb(null, uploadPath); // Save in uploads/images/ folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with unique name
  }
});

const upload = multer({ storage });  // Multer setup for handling the image upload

// Add a new image
export const addImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;  // Get the image filename from multer

    if (!image) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create a new image entry
    const newImage = new Image({
      title,
      description,
      imageUrl: image,  // Store the image filename in the database
    });

    await newImage.save();  // Save the new image to the database

    res.status(201).json({
      message: "Image uploaded successfully",
      newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all images
// export const getAllImages = async (req, res) => {
//   try {
//     const images = await Image.find();  // Find all images
//     res.status(200).json(images);  // Return the images
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();  // Fetch all images
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get a single image by ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);  // Find image by ID
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(image);  // Return the image
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an image (title, description, and file)// Update an image (title, description, and file)
export const updateImage = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null; // If a new file is uploaded

    const updatedFields = { title, description };
    if (image) {
      updatedFields.imageUrl = image; // Update image file if new image is uploaded
    }

    // Update the image by ID
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    
    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image updated successfully",
      updatedImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete an image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);  // Delete the image by ID
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { upload };
