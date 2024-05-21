import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";


const OrderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, `Email is required!`],
    },
    productId: {
        type: String,
        required: [true, `Product ID is required!`],
    },
    price: {
        type: Number,
        required: [true, `Price is required!`],
    },
    quantity: {
        type: Number,
        required: [true, `Quanity is required`],
    }
});


export const Order = model<TOrder>('Order', OrderSchema);