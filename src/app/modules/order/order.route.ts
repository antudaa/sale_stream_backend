import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(`/`, OrderControllers.createOrder); // Create order
router.get(`/`, OrderControllers.getOrders); // Get orders

export const OrderRoutes = router;
