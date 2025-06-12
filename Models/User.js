// import mongoose from 'mongoose';

// const UserSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     country: { type: String, required: true },
//     region: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     isAdmin: { type: Boolean, default: false }
// });
// // Password comparison method
// UserSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

// // Token generation method
// UserSchema.methods.generateAuthToken = function () {
//     return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// export default mongoose.model('User', UserSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  country: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  countryCode: { type: String, required: true, trim: true }, // ✅ This field is required
   role: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  lastLogout: { type: Date }
});


// ✅ Ensure `confirmPassword` is not stored in the database
userSchema.pre("save", function (next) {
  delete this.confirmPassword;
  next();
});

const User = mongoose.model("UserInfo", userSchema);

export default User;


