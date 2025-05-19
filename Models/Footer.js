import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyTagline: { type: String },
  address: { type: String },
  email: { type: String },
  phone: { type: String },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
  legalLinks: [
    {
      title: { type: String },
      url: { type: String },
    }
  ],
});

export default mongoose.model('Footer', footerSchema);
