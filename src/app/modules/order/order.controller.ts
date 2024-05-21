import { Request, Response } from "express";
import OrderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";



const createOrder = async (req: Request, res: Response) => {
    try {
        const { order: orderInfo } = req.body;
        const zodParsedOrderData = OrderValidationSchema.parse(orderInfo);

        const result = await OrderServices.createOrderInDB(zodParsedOrderData);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Order not found!`
            })
        }

        res.status(200).json({
            success: true,
            message: `Order created successfully!`,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `Something went wrong.`,
            error: error,
        })
    }
};


const getOrders = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        const result = await OrderServices.getOrders(email);

        if (!result.length) {
            return res.status(404).json({
                success: false,
                message: `Order not found!`
            })
        }

        res.status(200).json({
            success: true,
            message: email ?
                `Orders fetched successfully for user email!`
                :
                `Orders fetched successfully!`,
            data: result,
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || `No Order found.`,
            error: error,
        })
    }
}


export const OrderControllers = {
    createOrder,
    getOrders,
}


