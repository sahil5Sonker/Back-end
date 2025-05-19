import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    vision: { type: String, required: true },
    mission: { type: String, required: true },
    story: { type: String, required: true },
    whyChooseUs: { type: [String], required: true }, // Array of points
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;
