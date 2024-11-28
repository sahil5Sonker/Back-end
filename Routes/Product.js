import express from "express";
import { addProduct, deletProductById, getAllProducts, updateProductById } from "../Controllers/product.js";
import { getProduct ,} from "../Controllers/product.js";

const  router = express.Router();
// add products


router.post('/add',addProduct)
// get product
router.get('/all', getProduct)
// get products by id
router.get('/:id', getAllProducts)
// upadte
router.put("/:id",updateProductById)
// delet
router.delete("/:id",deletProductById)

export default router