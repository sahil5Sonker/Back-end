import About from "../Models/About.js";


// ✅ Get About Us Data
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ msg: "About Us content not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};

// ✅ Create or Update About Us (Admin Only)
export const updateAbout = async (req, res) => {
  try {
    const { title, description, vision, mission, story, whyChooseUs } = req.body;

    let about = await About.findOne();
    if (about) {
      about = await About.findOneAndUpdate(
        {},
        { title, description, vision, mission, story, whyChooseUs },
        { new: true }
      );
    } else {
      about = new About({ title, description, vision, mission, story, whyChooseUs });
      await about.save();
    }

    res.status(200).json({ msg: "About Us Updated Successfully", about });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error });
  }
};
