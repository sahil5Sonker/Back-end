import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../Models/User.js";
import { signUpSchema, loginSchema } from '../helper/validation.js';



// ✅ Admin: Fetch All Users
export const getAdminAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name firstName lastName email phoneNumber country region createdAt lastLogin");

    res.status(200).json({ users });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// 🟢 Sign Up Function
export const signUp = async (req, res) => {
  try {
    // ✅ Validate request body
    const { error } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }

    const { firstName, lastName, email, password, confirmPassword, country, region, phoneNumber, countryCode } = req.body; // ✅ Add countryCode

    // ✅ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user (Include countryCode)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      region,
      phoneNumber,
      countryCode,  // ✅ Include countryCode
      role: 0, // Default role for normal users
    });

    return res.status(201).json({
      msg: "Account created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        country: newUser.country,
        region: newUser.region,
        phoneNumber: newUser.phoneNumber,
        countryCode: newUser.countryCode,  // ✅ Send back countryCode
      },
    });

  } catch (error) {
    console.error("Error on signup:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// 🟢 Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(400).json({ msg: "Email not found" });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    // ✅ Debug role before sending response
    console.log("🔹 User Role from DB:", userInfo.role);

    // ✅ Generate token including role
    const token = jwt.sign(
  { id: userInfo._id, role: userInfo.role },    // ✅ change _id to id
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role, // ✅ Ensure role is sent
      },
    });
  } catch (error) {
    console.error("Error on login:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


// 🟢 Get All Users Function
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    return res.status(200).json({ msg: "Users retrieved successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
// admin



// 🟢 Get User by ID Function
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User retrieved successfully", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// 🟢 Delete User by ID Function
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ msg: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
// 🟢 Update User by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      msg: "User updated successfully",
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
    });

  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    // ✅ THIS LINE FIXED
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found!" });

    return res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return res.status(500).json({ msg: "Internal server error!" });
  }
};



// 🟢 Token Generation Function
const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET environment variable");
  }

  const userData = { _id: user._id, email: user.email, role: user.role };
  const expireTime = "1d"; // Token expires in 1 day

  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: expireTime });

  return token;
};
