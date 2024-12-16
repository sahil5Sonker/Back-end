import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    createdAt:{type:Date,default:Date.now()},
     // phoneNumber: { type: String,},
  // country : { type: String, require: true},
  // region:{ type: String, require: true},


});
export const User = mongoose.model("User", userSchema);