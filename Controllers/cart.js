import { Cart } from "../Models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = "6735add56900f41a62ce5837"; // Replace this with actual user ID from req if needed

  // Find the cart for the user
  let cart = await Cart.findOne({ userId });

  // If no cart exists, create a new cart for the user
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  // Check if the product is already in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // If item exists, update its quantity and price
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    // Otherwise, add a new item to the cart
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  // Save the cart after modifications
  await cart.save();

  // Return a response to the client
  res.json({ message: "Items added to cart", cart });
};

// get user  cart
export const userCart = async (req, res) => {
  const userId = "6735add56900f41a62ce5837";
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "cart not found" });
  res.json({ message: "cart  found", cart });
};

// remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;

  const userId = "6735add56900f41a62ce5837";

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "cart not found" });
  cart.items = cart.items.filter((item)=>item.productId.toString()!==productId);
  await cart.save();

  res.json({ message: "product remove from cart", cart });
};

// clear cart
export const clearCart = async (req, res) => {

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart({items:[]})
  } else{
    cart.items = [];
  }
  
  await cart.save();

  res.json({ message: " cart cleared"});
};

// decrease qty

export const decreaseProudctQty = async (req, res) => {
  const { productId, qty} = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });
 
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    // return res.json({messge:'Cart not find'})
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex]

    if(item.qty > qty){
        const pricePerUnit = item.price/item.qty

        item.qty -= qty
        item.price -= pricePerUnit*qty
    }else{
        cart.items.splice(itemIndex,1)
    }

  } else {
    return res.json({messge:'invalid product Id'})
  } 

  await cart.save();
  res.json({ message: "Items qty decreased", cart });
};