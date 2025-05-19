import ReturnPolicy from "../Models/ReturnPolicy.js";

// ✅ Get Return & Refund Policy
export const getReturnPolicy = async (req, res) => {
  try {
    const policy = await ReturnPolicy.findOne();
    if (!policy) return res.status(404).json({ msg: "Policy not found" });

    res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching return policy:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// ✅ Admin: Update Return & Refund Policy
export const updateReturnPolicy = async (req, res) => {
  try {
    const { policyText } = req.body;
    if (!policyText) return res.status(400).json({ msg: "Policy text is required" });

    let policy = await ReturnPolicy.findOne();
    if (!policy) {
      policy = new ReturnPolicy({ policyText });
    } else {
      policy.policyText = policyText;
    }
    
    await policy.save();
    res.status(200).json({ msg: "Policy updated successfully", policy });
  } catch (error) {
    console.error("Error updating policy:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
