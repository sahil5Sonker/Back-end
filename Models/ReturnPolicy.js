import mongoose from "mongoose";

const returnPolicySchema = new mongoose.Schema({
  policyText: { type: String, required: true },
}, { timestamps: true });

const ReturnPolicy = mongoose.model("ReturnPolicy", returnPolicySchema);
export default ReturnPolicy;
