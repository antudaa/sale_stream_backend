import express from 'express';
import { OrderControllers } from './order.controller';


const router = express.Router();

router.post(`/`, OrderControllers.createOrder); // Create Order Route
router.get(`/`, OrderControllers.getOrders); // Retrieve All Orders Route

export const OrderRoutes = router;