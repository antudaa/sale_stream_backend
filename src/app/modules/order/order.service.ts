import { TOrder } from "./order.interface";
import { Order } from "./order.model";


const createOrderInDB = async (orderData: TOrder) => {
    const result = await Order.create(orderData);
    return result;
};

// const getAllProducts = async (searchTerm?: string) => {

//     if (searchTerm) {
//         const regex = new RegExp(searchTerm, 'i');
//         const result = await Product.find({
//             $or: [
//                 { name: regex },
//                 { description: regex },
//                 { category: regex },
//                 { tags: regex }
//             ]
//         });
//         return result;
//     }
//     const result = await Product.find();
//     return result;
// };

const getOrders = async (email?: string) => {
    if (email) {
        const regex = new RegExp(email, 'i');
        const result = await Order.find({
            email: regex
        })
        return result;
    };
    const result = await Order.find();
    return result;
}

export const OrderServices = {
    createOrderInDB,
    getOrders,
}