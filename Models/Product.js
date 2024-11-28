import express from 'express';
import mongoose from 'mongoose';
const productScehma = new mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:String,require:true},
    category:{type:Date,default:Date.now},
    qty:{type:String,require:true},
    imgSrc:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
    
})
export const Products = mongoose.model('Products',productScehma)