import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lastname:{type:String, required:true},
    firstname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    createdAt:{type:Date,default:Date.now()},

});
export const User = mongoose.model("User", userSchema);