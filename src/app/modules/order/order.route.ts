import express from 'express';
import { OrderControllers } from './order.controller';


const router = express.Router();

router.post(`/`, OrderControllers.createOrder); // Create Order Route
router.get(`/`, OrderControllers.getOrders); // Route to Retrieve All Orders and Retrieve orders by useremail.

export const OrderRoutes = router;