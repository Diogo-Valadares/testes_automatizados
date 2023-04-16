export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    weight?:number;
    cartCount:number;
}