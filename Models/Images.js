import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema);

export default Image;
