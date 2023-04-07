import fs from 'fs';
import storeItem, { IStoreItem } from "@src/Entities/storeItem";

export interface IProductsDatabase {    
    products: IStoreItem[];
    recoverItemById(id:number):IStoreItem|undefined;
    recoverItemByName(id:string):IStoreItem|undefined;
}    

export class ProductsDatabase implements IProductsDatabase {
    private readonly filePath: string;
    public products: IStoreItem[];
  
    constructor(filePath: string = 'products') {
      this.filePath = filePath;
      this.products = JSON.parse(fs.readFileSync(filePath, 'utf-8')).map(
        (item: any) =>
          new storeItem(
            item.id,
            item.image,
            item.name,
            item.category,
            item.imageURL,
            item.weight
        )
      );
    }
  
    recoverItemById(id: number): IStoreItem | undefined {
      return this.products.find((item) => item.id === id);
    }
  
    recoverItemByName(name: string): IStoreItem | undefined {
      return this.products.find((item) => item.name === name);
    }
  }