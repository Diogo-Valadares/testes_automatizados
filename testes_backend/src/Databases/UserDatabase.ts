import User, { IUser } from "../Entities/user";

export interface IUserDatabase {    
    userList: IUser[];
    createUser(name: string, email: string, password: string): boolean;
    findUserByEmail(email: string): IUser | undefined;
    findUserById(id: number): IUser | undefined;
    destroyUser(id: number): boolean;
    userExists(email: string): boolean;
}

class UserDatabase implements IUserDatabase {
    userList: IUser[];
  
    constructor() {
      this.userList = [];
    }
  
    createUser(name: string, email: string, password: string): boolean {
      if (this.userExists(email)) {
        return false;
      }
      let id = this.userList.length;
      let user = new User(id, name, email, password);
      this.userList.push(user);
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
        return true;
      }
      return false;
    }
  
    userExists(email: string): boolean {
      return this.userList.some(user => user.email === email);
    }
  }
  export default UserDatabase;