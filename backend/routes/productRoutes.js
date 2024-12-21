import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import {userAuth} from "../middleware/userAuth.js";

const router = express.Router();

router.get('/', getProducts);

router.post('/', userAuth, createProduct);

router.put('/:id', userAuth, updateProduct);

router.delete('/:id', userAuth, deleteProduct);

export default router;
