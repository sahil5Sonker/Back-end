import { Products } from "../Models/Product.js";

// add products
export const addProduct = async (req, res) => {
  const { title, description, price, qty, category, imgSrc } = req.body;
  try {
    let product = await Products.create(
      {
        title,
      description,
      price,
      qty,
    
    category,imgSrc
      }
    );res.json({message:"Product created successfully",product});
  } catch (error) {
    res.json({ message: error.message });
  }
};

// get product
export const getProduct = async(req, res) =>{
    let product = await Products.findOne().sort({createdAt:-1})
    res.json({message:"allproduct",product});

   
}
// find by id product
export const getAllProducts = async(req, res) =>{
  const  id = req.params.id;
  let product = await Products.findById(id)
  if(!product) return res.json({message:"Inavalid ID"});
  res.json({message:"specific  products", product});

 
}
// update  id product
export const updateProductById = async(req, res) =>{
  const  id = req.params.id;
  let product = await Products.findByIdAndUpdate(id,req.body,{new:true})
  if(!product) return res.json({message:"Invalid Id"});
  res.json({message:"  Products has been updated" , product});

 
}
// delet by  id product
export const deletProductById = async(req, res) =>{
  const  id = req.params.id;
  let product = await Products.findByIdAndDelete(id)
  if(!product) return res.json({message:"Invalid Id"});
  res.json({message:"  Products has been delet" , product});

 
}
