import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, getProduct, getMyProducts } from "../controllers/productController.js";
import {userAuth} from "../middleware/userAuth.js";

const router = express.Router();



router.get('/my-products', userAuth, getMyProducts);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', userAuth, createProduct);

router.put('/:id', userAuth, updateProduct);

router.delete('/:id', userAuth, deleteProduct);

export default router;
