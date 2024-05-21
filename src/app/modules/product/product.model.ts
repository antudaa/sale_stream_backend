import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";


const VariantSchema = new Schema<TVariant>({
    type: {
        type: String,
        required: [true, `Variant type is required.`],
        maxlength: [30, `Variant type cannot be more then 30 characters.`],
    },
    value: {
        type: String,
        required: [true, `Variant Value is required.`],
        maxlength: [30, `Variant value cannot be more then 30 characters.`]
    }
});


const InventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: [true, `Inventory quantity is required.`],
    },
    inStock: {
        type: Boolean,
        default: true,
    }
});


const ProductSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: [true, `Product name is required.`],
        unique: true,
    },
    description: {
        type: String,
        required: [true, `Product description is required.`],
    },
    price: {
        type: Number,
        required: [true, `Product price is required.`],
    },
    category: {
        type: String,
        required: [true, `Product category is required.`],
    },
    tags: {
        type: [String],
        required: [true, `Product tags are required.`],
    },
    variants: {
        type: [VariantSchema],
        required: [true, `Porduct variant is required.`],
    },
    inventory: {
        type: InventorySchema, // Using a single InventorySchema object
        required: [true, `Inventory is required.`],
    },
});

export const Product = model<TProduct>(`Product`, ProductSchema);

