import express from 'express';
import { ProductControllers } from './product.controller';


const router = express.Router();

router.post(`/`, ProductControllers.createProduct); // Create Product Route
router.get(`/`, ProductControllers.getProducts); // Route for Retrieve All Products and search product via query.
router.get(`/:productId`, ProductControllers.getSpecificProduct); // Retrieve Specific Product By ID
router.put(`/:productId`, ProductControllers.updateProductInfo); // Update Product By ID
router.delete(`/:productId`, ProductControllers.deleteProduct); // Delete Product By ID


export const ProductRoutes = router;