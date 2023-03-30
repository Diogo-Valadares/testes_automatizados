import { IUserDatabase } from "@src/Databases/UserDatabase";
import generateAuthToken from "@src/Tools/AuthTokenGenerator";
import { ISectionManager,SectionManager } from "@src/useCases/sectionManager";
import storeItem from "../Entities/storeItem";

export interface IStoreController {
    login(email: string, password: string): Promise<string>;
    signUp(email: string, name: string, password: string): Promise<boolean>;
    addToCart(authToken: string, item: storeItem): void;
    purchase(authToken: string): Promise<boolean>;
    checkout(authToken: string): Promise<boolean>;
  }

 class storeController implements IStoreController{
    sectionManager:ISectionManager;
    userDatabase: IUserDatabase;
    constructor(sectionManager:ISectionManager,userDatabase:IUserDatabase){
        this.sectionManager = sectionManager;
        this.userDatabase = userDatabase;
    }

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
     async signUp(email: string, name: string, password: string): Promise<boolean> {
        if(this.userDatabase.createUser(name,email,password)){
            return Promise.resolve(true);
        }
        return Promise.reject();        
     }

     addToCart(authToken: string, item: storeItem): void {
         throw new Error("Method not implemented.");
     }
     purchase(authToken: string): Promise<boolean> {
         throw new Error("Method not implemented.");
     }
     checkout(authToken: string): Promise<boolean> {
         throw new Error("Method not implemented.");
     }    
}

export default storeController