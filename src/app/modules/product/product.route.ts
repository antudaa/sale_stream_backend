import express from 'express';
import { ProductControllers } from './product.controller';


const router = express.Router();

router.post(`/`, ProductControllers.createProduct);  // Create product.
router.get(`/`, ProductControllers.getProducts);  // Get Products.
router.get(`/:productId`, ProductControllers.getSpecificProduct);  // Get product by ID.
router.put(`/:productId`, ProductControllers.updateProductInfo);  // Update product.
router.delete(`/:productId`, ProductControllers.deleteProduct);  // Delete product.


export const ProductRoutes = router;