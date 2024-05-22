import { Request, Response } from "express";
import ProductValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";


const createProduct = async (req: Request, res: Response) => {
    try {
        const productInfo = req.body;
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

const getProducts = async (req: Request, res: Response) => {
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
            message: searchTerm ?
                `Products matching search term ${searchTerm} fetched successfully!`
                :
                `Products fetched successfully!`,
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
        // Validating the length of productId before querying. Cause we know mongodb always provides us a 24 char id.
        if (productId.length !== 24) {
            return res.status(404).json({
                success: false,
                message: `No product available with this id!`,
            });
        }
        const result = await ProductServices.getSpecificProduct(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `No product available with this id!`,
            });
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
    getProducts,
    getSpecificProduct,
    updateProductInfo,
    deleteProduct,
}