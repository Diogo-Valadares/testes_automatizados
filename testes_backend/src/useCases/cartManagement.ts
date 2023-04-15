import { IUserDatabase } from "@src/Databases/UserDatabase";

export interface IUserCartManager {
  userDatabase: IUserDatabase;
  getUserCart(id: number): Promise<string>;
  addToUserCart(userID: number, itemID: number): Promise<string>;
  removeFromUserCart(userID: number, itemID: number): Promise<string>;
}

export class UserCartManager implements IUserCartManager {
    constructor(public userDatabase: IUserDatabase) {}
    
    async getUserCart(id: number): Promise<string> {
        let userCart = this.userDatabase.getUserCart(id);
        if(userCart === undefined){
            return Promise.reject("Internal Error!");
        }
        return Promise.resolve(JSON.stringify(userCart));
    }
    
    async addToUserCart(userID: number, itemID: number): Promise<string> {
        let wasAdded = this.userDatabase.addToUserCart(userID,itemID);
        if(!wasAdded){
            return Promise.reject("Internal Error");
        }
        return Promise.resolve("Product added successfuly!");
    }
    
    async removeFromUserCart(userID: number, itemID: number): Promise<string>{
        let wasRemoved = this.userDatabase.removeFromUserCart(userID,itemID);
        if(!wasRemoved){
            return Promise.reject("Internal Error!");
        }        
        return Promise.resolve("Product removed successfuly!");
    }
}