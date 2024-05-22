import { Request, Response } from "express";
import ProductValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {
    try {
        const { products: productInfo } = req.body;
        const zodParserdProductData = ProductValidationSchema.parse(productInfo);

        const result = await ProductServices.createProductIntoDB(zodParserdProductData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Product creation failed!`
            })
        }

        res.status(200).json({
            success: true,
            message: `Product created successfully!`,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.issues[0].message || `Something went wrong!`,
            error: error,

        })
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const result = await ProductServices.getAllProducts(searchTerm);
        if (!result.length) {
            return res.status(404).json({
                success: false,
                message: `Product not found!`
            })
        }

        res.status(200).json({
            success: true,
            message: `Products fetched successfully!`,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `Something went wrong`,
            error: error,
        })
    }
};

const getSpecificProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        console.log(req.params);
        const result = await ProductServices.getSpecificProduct(productId.toString());
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Product not found!`
            })
        }

        res.status(200).json({
            success: true,
            message: `Product fetched successfully!`,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `No product available with this id.`,
            error: error,
        })
    }
};

const updateProductInfo = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updatedProductData = req.body;
        console.log(productId);
        const result = await ProductServices.updateProductInfo(productId.toString(), updatedProductData);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Product not found!`
            })
        }

        res.status(200).json({
            success: true,
            message: `Product updated successfully!`,
            data: result,
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `Product updation failed!`,
            error: error,
        })
    }
};


const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductServices.deleteProductById(productId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Product not found!`,
            })
        }

        res.status(200).json({
            success: true,
            message: `Product deleted successfully!`,
            data: null,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `Product not found!`,
            error: error,
        })
    }
}


export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSpecificProduct,
    updateProductInfo,
    deleteProduct,
}