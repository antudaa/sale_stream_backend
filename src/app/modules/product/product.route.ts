import express from 'express';
import { ProductControllers } from './product.controller';


const router = express.Router();

router.post(`/`, ProductControllers.createProduct); // Create Product Route
router.get(`/`, ProductControllers.getAllProducts); // Retrieve All Products Route
router.get(`/:productId`, ProductControllers.getSpecificProduct); // Retrieve Specific Product By ID
router.put(`/:productId`, ProductControllers.updateProductInfo); // Update Product By ID
router.delete(`/:productId`, ProductControllers.deleteProduct); // Delete Product By ID
router.post(`/`,); // Search A Product


export const ProductRoutes = router;