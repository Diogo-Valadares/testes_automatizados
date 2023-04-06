import {Request,Response, response} from 'express'
import generateAuthToken from "@src/Tools/AuthTokenGenerator";
import { IUserManagement as IUserManager } from "@src/useCases/userManagement";
import storeItem from "../Entities/storeItem";

export interface IStoreController {
    login(req:Request, res:Response): void;
    signUp(req:Request, res:Response): void;
    logoff(req: Request, res:Response):void;
    getUserData(req: Request, res:Response): void;
    addToCart(req:Request, res:Response): void;
    purchase(req:Request, res:Response): void;
    checkout(req:Request, res:Response): void;
  }

 class storeController implements IStoreController{
 
    constructor(public userManager:IUserManager){}

     async login(req:Request, res:Response){       
        const { email, password } = req.body;
        let result = this.userManager.login(email, password);

        result.then(response=>{
            console.log("Sent 200:"+response);
            res.status(200).send(response);
        }).catch(error=>{            
            console.log("Sent 400:"+error);
            res.status(400);
            res.statusMessage = error;
            res.send()
        })
     }
     async signUp(req:Request, res:Response) {
        const {name, email, password } = req.body;
        let result = this.userManager.signUp(email,name,password);

        result.then(response=>{            
            console.log("Sent 200:"+response);            
            res.status(200).send(response);
        }).catch(error=>{
            console.log("Sent 400:"+error);            
            res.status(400);
            res.statusMessage = error;
            res.send()
        })
     }
     async logoff(req: Request, res:Response) {
        const {authToken} = req.body;
        let result = this.userManager.logoff(authToken);

        result.then(response=>{            
            console.log("Sent 200:"+response);            
            res.status(200).send(response);
        }).catch(error=>{
            console.log("Sent 400:"+error);            
            res.status(400);
            res.statusMessage = error;
            res.send()
        })
     }
     async getUserData(req: Request, res:Response) {
        const {authToken} = req.body;
        let result = this.userManager.getUserData(authToken);
        result.then(response=>{            
            console.log("Received:"+authToken+"\nSent 200:"+response);            
            res.status(200).send(response);
        }).catch(error=>{
            console.log("Received:"+authToken+"\nSent 403:"+error);            
            res.status(400);
            res.statusMessage = error;
            res.send()
        })
     }

     addToCart(req:Request, res:Response): void {
        //authToken: string, item: storeItem
         throw new Error("Method not implemented.");
     }
     purchase(req:Request, res:Response) {
        //authToken: string
         throw new Error("Method not implemented.");
     }
     checkout(req:Request, res:Response) {
        //authToken: string
         throw new Error("Method not implemented.");
     }    
}

export default storeController