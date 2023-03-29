import generateAuthToken from "@src/Tools/AuthTokenGenerator";
import storeItem from "../Entities/storeItem";

export interface IStoreController {
    login(email: string, password: string): Promise<string>;
    signUp(email: string, name: string, password: string): Promise<boolean>;
    addToCart(authToken: string, item: storeItem): void;
    purchase(authToken: string): Promise<boolean>;
    checkout(authToken: string): Promise<boolean>;
  }

 class storeController implements IStoreController{
     async login(email: string, password: string): Promise<string> {
        //contatar banco de dados para verificar se o usuario existe
        //Verificar se a senha esta correta
        let newSectionAuthToken = generateAuthToken()
        //armazenar o AuthToken como uma nova seção
        //
        return Promise.resolve(newSectionAuthToken);
     }
     async signUp(email: string, name: string, password: string): Promise<boolean> {
        console.log("Implemente o sign up");
        return Promise.resolve(false);;
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