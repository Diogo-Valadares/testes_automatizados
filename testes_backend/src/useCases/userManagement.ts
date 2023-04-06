import { IUserDatabase } from "@src/Databases/UserDatabase";
import { ISectionManager } from "@src/Databases/sectionManager";
import generateAuthToken from "../Tools/AuthTokenGenerator";

export interface IUserManagement{
    login(email: string, password: string): Promise<string>;
    signUp(email: string, name: string, password: string): Promise<string>;
    logoff(authToken : string): Promise<string>;    
    getUserData(authToken: string): Promise<string>;
}

export class UserManagement implements IUserManagement{
    constructor(
        public userDatabase: IUserDatabase, 
        public sectionManager:ISectionManager
    ){}
    
    async login(email: string, password: string): Promise<string> {       
        let user = this.userDatabase.findUserByEmail(email);
        if(user === undefined){
            return Promise.reject(new Error('User not found'));
        }
        if(user.password != password){
            return Promise.reject(new Error('Password doesn\'t match'));
        }
        let newSectionAuthToken = generateAuthToken();
        this.sectionManager.createSection(newSectionAuthToken,user.id)
        return Promise.resolve(newSectionAuthToken);
    }
     
    async signUp(email: string, name: string, password: string): Promise<string> {              
        console.log(email);  
        if(this.userDatabase.userExists(email)){
            return Promise.reject(new Error("User already exists!"));      
        }  
        if(this.userDatabase.createUser(name,email,password)){
            return Promise.resolve("User sucessfully created!");
        }
        return Promise.reject(new Error("Internal Error"));
    }

    async logoff(authToken: string): Promise<string> {
        if(this.sectionManager.destroySection(authToken)){
            return Promise.resolve("Successfully signed off!");
        }        
        return Promise.reject(new Error("Already logged off, refresh the page."));
    }
    
    async getUserData(authToken: string): Promise<string> {
        let id = this.sectionManager.getUserID(authToken);
        console.log(id);
        if(id < 0){
            return Promise.reject(new Error("Log in in order to get data!"));            
        }
        let data = this.userDatabase.findUserById(id);
        return Promise.resolve(stringify(data,["id","password"]));        
    }       
}

function stringify(entity:any, fieldsToRemove:any) {
    console.log(fieldsToRemove);
    return JSON.stringify(entity, (key, value) => {
      if (fieldsToRemove.includes(key)) {
        return undefined;
      }
      return value;
    });
}