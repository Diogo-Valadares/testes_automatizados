export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}
class User implements IUser {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public password: string,
    ) {} 
} 
export default User;
