import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderInDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getOrders = async (email?: string) => {
  if (email) {
    // const regex = new RegExp(email, 'i');
    const result = await Order.find({
      email: email,
    });
    return result;
  }
  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderInDB,
  getOrders,
};
