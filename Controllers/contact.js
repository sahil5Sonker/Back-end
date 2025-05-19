import Contact from "../Models/Contact.js";

// 📌 Submit Contact Form (User Inquiry)
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ msg: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// 📌 Get All Messages (Admin Only)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
