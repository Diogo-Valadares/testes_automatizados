import fs from 'fs';
import storeItem, { IStoreItem } from "@src/Entities/storeItem";

export interface IProductsDatabase {    
    products: IStoreItem[];
    getItemById(id:number):IStoreItem|undefined;
    getItemByName(id:string):IStoreItem|undefined;
    getProducts(offset: number, limit: number):IStoreItem[];
}    

export class ProductsDatabase implements IProductsDatabase {
    public products: IStoreItem[];
  
    constructor(filePath: string = 'products') {
      this.products = JSON.parse(fs.readFileSync('data/'+filePath+'.json', 'utf-8')).map(
        (item: any) =>
          new storeItem(
            item.id,
            item.image,
            item.name,
            item.price,
            item.category,
            item.weight
        )
      );
    }
  
    getItemById(id: number): IStoreItem | undefined {
      return this.products.find((item) => item.id === id);
    }
  
    getItemByName(name: string): IStoreItem | undefined {
      return this.products.find((item) => item.name === name);
    }

    getProducts(offset: number, limit: number):IStoreItem[]{
      let productsPerPage = limit;
      let page = offset;
      let startIndex = page* productsPerPage;
      let endIndex = startIndex + productsPerPage;
      return this.products.slice(startIndex, endIndex)
    }
  }