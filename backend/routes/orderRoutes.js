import express from 'express';
import { createOrder, deleteOrder, getOrders } from '../controllers/orderController.js';
import { userAuth } from '../middleware/userAuth.js';
const router = express.Router();

router.get('/', userAuth, getOrders )

router.post('/createOrder', userAuth, createOrder)

router.delete('/:id', userAuth, deleteOrder);

export default router;