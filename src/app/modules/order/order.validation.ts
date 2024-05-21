import { z } from "zod";

const OrderValidationSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address!" }),
    productId: z.string()
        .min(1, "Product ID is required!"),
    price: z.number()
        .int()
        .nonnegative("Price must be a positive number!"),
    quantity: z.number()
        .int()
        .nonnegative("Quantity must be at least 1!")
});

export default OrderValidationSchema;