import Footer from '../Models/Footer.js';

// Get Footer Data (public)
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: 'Footer data not found' });
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Footer Data (admin)
export const updateFooter = async (req, res) => {
  try {
    const footer = await Footer.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
