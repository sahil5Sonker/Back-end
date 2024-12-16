// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },  // Unique email
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
//      // phoneNumber: { type: String,},
//   // country : { type: String, require: true},
//   // region:{ type: String, require: true},




//   export const User = mongoose.model('User', userSchema);
// In your User.js model
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;  // Default export instead of named export

