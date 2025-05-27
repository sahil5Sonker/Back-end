import Image from "../Models/Images.js";
import multer from "multer";
import path from "path";

// ✅ Configure multer for single image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // store in /uploads
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PNG files are allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter }).single("image");

// ✅ Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// ✅ Add a new image with upload
export const addImage = async (req, res) => {
  const { title, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  try {
    const newImage = new Image({ imageUrl, title, description });
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", newImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to add image" });
  }
};

// ✅ Update an image (no file upload in update here)
export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { imageUrl, title, description } = req.body;

  try {
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { imageUrl, title, description },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({ message: "Image updated successfully", updatedImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to update image" });
  }
};

// ✅ Delete an image
export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedImage = await Image.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};
