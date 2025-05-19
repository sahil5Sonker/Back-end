import Image from "../Models/Images.js";

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

// Add a new image
export const addImage = async (req, res) => {
  const { imageUrl, title, description } = req.body;

  try {
    const newImage = new Image({ imageUrl, title, description });
    await newImage.save();
    res.status(201).json({ message: "Image added successfully", newImage });
  } catch (error) {
    res.status(500).json({ error: "Failed to add image" });
  }
};

// Update an image
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

// Delete an image
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
