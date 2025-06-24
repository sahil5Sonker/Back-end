import Lead from "../Models/Lead.js";

// Public lead creation
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ msg: "Name and email are required." });
    }

    const newLead = new Lead({ name, email, phone, message });
    await newLead.save();
    res.status(201).json({ msg: "Lead saved successfully." });
  } catch (err) {
    res.status(500).json({ msg: "Server error." });
  }
};

// Admin get all leads
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch leads." });
  }
};

// Admin get lead by ID
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: "Lead not found." });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ msg: "Error retrieving lead." });
  }
};

// Admin update lead
export const updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ msg: "Lead not found." });
    res.status(200).json({ msg: "Lead updated.", lead: updated });
  } catch (err) {
    res.status(500).json({ msg: "Update failed." });
  }
};

// Admin delete lead
export const deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Lead not found." });
    res.status(200).json({ msg: "Lead deleted." });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed." });
  }
};
