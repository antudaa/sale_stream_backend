import { Request, Response } from "express";
import OrderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";
import { Product } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderInfo } = req.body;
    const { productId, quantity, price } = orderInfo;
    const zodParsedOrderData = OrderValidationSchema.parse(orderInfo);
    const productInfo = await Product.isProductAvailable(
      productId,
      quantity,
      price,
    );

    if (zodParsedOrderData && productInfo) {
      const result = await OrderServices.createOrderInDB(zodParsedOrderData);

      res.status(200).json({
        success: true,
        message: `Order created successfully!`,
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ? error.message : `Somethign went wrong!`,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getOrders(email);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `No order found with this email!`,
      });
    }

    res.status(200).json({
      success: true,
      message: email
        ? `Orders fetched successfully for user email!`
        : `Orders fetched successfully!`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || `Something went wrong!`,
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getOrders,
};
