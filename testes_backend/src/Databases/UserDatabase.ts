import User, { IUser } from "../Entities/user";
import * as fs from 'fs';

export interface IUserDatabase {    
    userList: IUser[];
    createUser(name: string, email: string, password: string): boolean;
    findUserByEmail(email: string): IUser | undefined;
    findUserById(id: number): IUser | undefined;
    destroyUser(id: number): boolean;
    userExists(email: string): boolean;
    getUserCart(userID: number):Array<[number,number]>|undefined;
    addToUserCart(userID: number,productID: number):boolean;
    removeFromUserCart(userID: number,productID: number):boolean;
}

class UserDatabase implements IUserDatabase {
    userList: Array<User>;  

    constructor(public fileName:string = "users") {
      this.userList = [];
      this.loadUserList();
    }
    
    private loadUserList(): void {
      try {
        const data = fs.readFileSync('data/'+this.fileName+'.json');
        let parsedData = JSON.parse(data.toString());
        if (Array.isArray(parsedData)) {
          this.userList = parsedData;
        } 
      } catch (err) {
        this.userList = [];
      }
    }
    private saveUserList(): void {
      fs.writeFileSync('data/'+this.fileName+'.json', JSON.stringify(this.userList)) ;
    }

    createUser(name: string, email: string, password: string): boolean {
      if (this.userExists(email)) {
        return false;
      }
      let id = this.userList.length==0 ? 0 : this.userList[this.userList.length-1].id + 1;
      let user = new User(id, name, email, password);
      this.userList.push(user);
      this.saveUserList();
      return true;
    }
  
    findUserByEmail(email: string): User | undefined {
      return this.userList.find(user => user.email === email);
    }
  
    findUserById(id: number): User | undefined {
      return this.userList.find(user => user.id === id);
    }
  
    destroyUser(id: number): boolean {
      const index = this.userList.findIndex(user => user.id === id);
      if (index !== -1) {
        this.userList.splice(index, 1);
        this.saveUserList();
        return true;
      }
      return false;
    }
  
    userExists(email: string): boolean {
      return this.userList.some(user => user.email === email);
    }

    getUserCart(userID: number):Array<[number,number]>|undefined
    {
        let index = this.userList.findIndex(user => user.id === userID);
        if(index === -1){
            return undefined;
        }
        return this.userList[index].cart;
    }
    addToUserCart(userID: number,productID: number):boolean{
      let index = this.userList.findIndex(user => user.id === userID);
      if(index === -1){
          return false;
      }
      let indexProdutoNoCarrinho = 
        this.userList[index].cart.findIndex(p => p[0] === productID);
      if(indexProdutoNoCarrinho !== -1){
        this.userList[index].cart[indexProdutoNoCarrinho][1]++;               
        this.saveUserList();
        return true;
      }
      this.userList[index].cart.push([productID,1]);
      return true
    }
    removeFromUserCart(userID: number,productID: number):boolean{
      let index = this.userList.findIndex(user => user.id === userID);
      if(index === -1){
          return false;
      }
      let indexProdutoNoCarrinho = 
        this.userList[index].cart.findIndex(p => p[0] === productID);
      if(indexProdutoNoCarrinho !== -1){
        this.userList[index].cart[indexProdutoNoCarrinho][1]--;
        if(this.userList[index].cart[indexProdutoNoCarrinho][1] === 0){
          this.userList[index].cart.splice(indexProdutoNoCarrinho);   
        }               
        this.saveUserList();
        return true;
      }
      return false;
    }
    
  }
  export default UserDatabase;