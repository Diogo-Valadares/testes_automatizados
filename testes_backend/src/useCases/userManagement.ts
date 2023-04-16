import { IUserDatabase } from "@src/Databases/UserDatabase";

export interface IUserManagement{
    checkLoginData(email: string, password: string): Promise<number>;
    signUp(email: string, name: string, password: string): Promise<string>;
    getUserData(id: number): Promise<string>;
}

export class UserManagement implements IUserManagement{
    constructor(
        public userDatabase: IUserDatabase
    ){}
    
    async checkLoginData(email: string, password: string): Promise<number> {       
        let user = this.userDatabase.findUserByEmail(email);
        if(user === undefined){
            return Promise.reject(new Error('User not found'));
        }
        if(user.password !== password){
            return Promise.reject(new Error('Password doesn\'t match'));
        }
        return Promise.resolve(user.id);
    }
     
    async signUp(email: string, name: string, password: string): Promise<string> {              
        if(this.userDatabase.userExists(email)){
            return Promise.reject(new Error("User already exists!"));      
        }  
        if(this.userDatabase.createUser(name,email,password)){
            return Promise.resolve("User sucessfully created!");
        }
        return Promise.reject(new Error("Internal Error"));
    }

    async getUserData(id:number): Promise<string> {
        let data = this.userDatabase.findUserById(id);
        if(data === undefined){
            return Promise.reject(new Error("Internal database error!"))
        }
        return Promise.resolve(stringify(data,["id","password","cart"]));        
    }     
}

    function stringify(entity:any, fieldsToRemove:any) {
    return JSON.stringify(entity, (key, value) => {
      if (fieldsToRemove.includes(key)) {
        return undefined;
      }
      return value;
    });
}