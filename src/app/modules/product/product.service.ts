import { TProduct } from "./product.interface";
import { Product } from "./product.model";



const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};


const getAllProducts = async (searchTerm?: string) => {

    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i');
        const result = await Product.find({
            $or: [
                { name: regex },
                { description: regex },
                { category: regex },
                { tags: regex }
            ]
        });
        return result;
    }
    const result = await Product.find();
    return result;
};


const getSpecificProduct = async (id: string) => {
    const result = await Product.findById(id);
    return result;
};

// Service to Update Product [Note: Here the work of Partial is make all the properties optional we need to use this cause in update we always don't need to update the full document, sometimes we need to update only one property].
const updateProductInfo = async (id: string, updatedProductData: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    return result;
};

const deleteProductById = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
};


export const ProductServices = {
    createProductIntoDB,
    getAllProducts,
    getSpecificProduct,
    updateProductInfo,
    deleteProductById
};