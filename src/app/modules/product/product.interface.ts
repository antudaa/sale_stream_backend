import { Model } from "mongoose";

export interface TVariant {
    type: string,
    value: string,
};

export interface TInventory {
    quantity: number,
    inStock: boolean,
};

export interface TProduct {
    name: string,
    description: string,
    price: number,
    category: string,
    tags: string[],
    variants: TVariant[],
    inventory: TInventory,
};

// Creating Method to check is product available in stock or not.
export interface ProductModel extends Model<TProduct> {
    isProductAvailable(productID: string, quantity: number, price: number): Promise<TProduct | null>
}