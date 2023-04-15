export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    carrinho:Array<[number, number]>;
}
class User implements IUser {
    public carrinho:Array<[number, number]> = new Array<[number, number]>();
    
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
    ) {} 
} 
export default User;
