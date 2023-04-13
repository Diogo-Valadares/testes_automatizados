import { IProductsDatabase} from "@src/Databases/productsDatabase";

export interface IProductFinder{    
    getProduct(id:number):Promise<string>;
    getProducts(offset:number,limit:number):Promise<string>;
    findProduct(name:string):Promise<string>;
}

export class ProductFinder implements IProductFinder{    
    constructor(public productsDatabase:IProductsDatabase){}

    async getProduct(id: number): Promise<string> {        
        let product = this.productsDatabase.getItemById(id);
        if(product === undefined){
            return Promise.reject('Product does not exist!');
        }
        return Promise.resolve(JSON.stringify(product))
    }

    async getProducts(offset: number, limit: number): Promise<string> {
        let products = this.productsDatabase.getProducts(offset,limit);
        if(products.length == 0){
            return Promise.reject("There's more products to load");
        }
        return Promise.resolve(JSON.stringify(products))
    }

    async findProduct(name: string): Promise<string> {
        let product = this.productsDatabase.getItemByName(name);
        if(product === undefined){
            return Promise.reject('Product does not exist!');
        }
        return Promise.resolve(JSON.stringify(product))
    }
}