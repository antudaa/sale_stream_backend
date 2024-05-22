import { Schema, model } from "mongoose";
import { ProductModel, TInventory, TProduct, TVariant } from "./product.interface";


const VariantSchema = new Schema<TVariant>({
    type: {
        type: String,
        required: true,
        maxlength: [30, `Variant type cannot be more then 30 characters.`],
    },
    value: {
        type: String,
        required: true,
        maxlength: [30, `Variant value cannot be more then 30 characters.`]
    }
});


const InventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    }
});


const ProductSchema = new Schema<TProduct, ProductModel>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [VariantSchema],
        required: true,
    },
    inventory: {
        type: InventorySchema,
        required: true,
    },
});


// Method to check available quantiy in inventory and inStock status.
ProductSchema.statics.isProductAvailable = async function (productId: string, quantity: number, price: number) {
    const product = await this.findById(productId);

    if (!product) {
        throw new Error(`Order not found`);
    }

    if (product.inventory.quantity < quantity) {
        throw new Error(`Insufficient quantity available in inventory`);
    }

    const totalPrice = product.price * quantity;
    if (totalPrice !== price) {
        throw new Error(`Price does not match! Total price is ${totalPrice}tk.`);
    }

    const remainingQuantity = product.inventory.quantity - quantity;
    const inStock = remainingQuantity > 0;

    const updatedProduct = await this.findByIdAndUpdate(
        productId,
        {
            "inventory.quantity": remainingQuantity,
            "inventory.inStock": inStock
        },
        { new: true }
    );

    if (!updatedProduct) {
        return false;
    }

    return true;
};

export const Product = model<TProduct, ProductModel>(`Product`, ProductSchema);

