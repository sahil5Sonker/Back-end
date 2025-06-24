import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", LeadSchema);
export default Lead;
