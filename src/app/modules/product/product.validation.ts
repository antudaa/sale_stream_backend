import { z } from 'zod';

// Define Zod schema for Variant
const VariantValidationSchema = z.object({
    type: z.string()
        .max(30, "Variant type cannot be more than 30 characters.")
        .min(1, "Variant type is required."),
    value: z.string()
        .max(30, "Variant value cannot be more than 30 characters.")
        .min(1, "Variant value is required."),
});

// Define Zod schema for Inventory
const InventoryValidationSchema = z.object({
    quantity: z.number()
        .nonnegative("Inventory quantity must be a non-negative number.")
        .int("Inventory quantity must be an integer."),
    inStock: z.boolean().default(true),
});

// Define Zod schema for Product
const ProductValidationSchema = z.object({
    name: z.string()
        .min(1, "Product name is required."),
    description: z.string()
        .min(1, "Product description is required."),
    price: z.number()
        .nonnegative("Product price must be a non-negative number."),
    category: z.string()
        .min(1, "Product category is required."),
    tags: z.array(z.string()),
    variants: z.array(VariantValidationSchema)
        .min(1, "At least one product variant is required."),
    inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;