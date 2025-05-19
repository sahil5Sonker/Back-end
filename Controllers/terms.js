import Terms from "../Models/Terms.js";

// 📌 Add or Update Terms & Conditions (Admin Only)
export const updateTerms = async (req, res) => {
  try {
    const { title, content } = req.body;

    let terms = await Terms.findOne();
    if (terms) {
      terms.title = title;
      terms.content = content;
    } else {
      terms = new Terms({ title, content });
    }

    await terms.save();
    res.status(200).json({ msg: "Terms & Conditions updated successfully!" });
  } catch (error) {
    console.error("❌ Error updating terms:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// 📌 Get Terms & Conditions
export const getTerms = async (req, res) => {
  try {
    const terms = await Terms.findOne();
    if (!terms) {
      return res.status(404).json({ msg: "No Terms & Conditions found" });
    }
    res.status(200).json(terms);
  } catch (error) {
    console.error("❌ Error fetching terms:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
