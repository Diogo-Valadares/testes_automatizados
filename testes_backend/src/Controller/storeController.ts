import {Request,Response, response} from 'express'
import generateAuthToken from "../Tools/AuthTokenGenerator";
import { IUserManagement as IUserManager } from "../useCases/userManagement";
import { IProductFinder } from '../useCases/productFinder';
import { ISectionManager } from '../useCases/sectionManager';
import { IUserCartManager } from '../useCases/cartManagement';


export interface IStoreController {
    login(req:Request, res:Response): void;
    signUp(req:Request, res:Response): void;
    logoff(req: Request, res:Response):void;
    getUserData(req: Request, res:Response): void;
    addToCart(req:Request, res:Response): void;
  }

 class storeController implements IStoreController{
 
    constructor(
        public sectionManager:ISectionManager,
        public userManager:IUserManager,
        public productFinder:IProductFinder,
        public cartManagement:IUserCartManager,
        ){}

    async login(req:Request, res:Response){       
    const { email, password } = req.body;
    let resultID = this.userManager.checkLoginData(email, password);

    resultID.then(id=>{            
        let newSectionAuthToken = generateAuthToken();
        let response = this.sectionManager.createSection(newSectionAuthToken,id)
        response.then(()=>{
            console.log("Sent 200:"+newSectionAuthToken);
            res.status(200).send(newSectionAuthToken);
        }).catch(error=>{
            console.log("Sent 400:"+error);            
            res.status(400);
            res.statusMessage = error;
            res.send()
        })        
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
    const authToken = req.query.authToken as string;
    let result = this.sectionManager.destroySection(authToken);

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
    const authToken = req.query.authToken as string;
    let resultID = this.sectionManager.getUserID(authToken);
    resultID.then(id=>{
        let result = this.userManager.getUserData(id);
        result.then(response=>{            
            console.log("Received:"+authToken+"\nSent 200:"+response);            
            res.status(200).send(response);
        }).catch(error=>{
            console.log("Received:"+authToken+"\nSent 403:"+error);            
            res.status(500);
            res.statusMessage = error;
            res.send()
        })
    }).catch(error=>{
        console.log("Received:"+authToken+"\nSent 403:"+error);            
        res.status(403);
        res.statusMessage = error;
        res.send()
    })        
    }   
      
    async getProduct(req: Request, res:Response){
    const productId = req.query.id;
    console.log("Requested Product:"+productId);
    let result = this.productFinder.getProduct(parseInt(productId as string));
    result.then(response=>{            
        console.log("Requested Product:"+productId+"\nSent 200:"+response);            
        res.status(200).json(response);
    }).catch(error=>{
        console.log("Requested Product:"+productId+"\nSent 404:"+error);            
        res.status(404);
        res.statusMessage = error;
        res.send()
    })
    }
    async getProducts(req: Request, res:Response){
        let limit = parseInt(req.query.limit as string)  || 10; // default to 10 products
        let offset = parseInt(req.query.offset as string) || 0; // default to start from the first product    
        let result = this.productFinder.getProducts(offset, limit);
        result.then(response=>{            
            console.log("Requested Products:"+limit+" "+offset+"\nSent 200:"+response);            
            res.status(200).json(response);
        }).catch(error=>{
            console.log("Requested Products:"+limit+" "+offset+"\nSent 404:"+error);            
            res.status(404);
            res.statusMessage = error;
            res.send()
        })        
    }

    async addToCart(req:Request, res:Response) {        
        const authToken = req.query.authToken as string;        
        const product =  parseInt(req.query.product as string);

        let ifItemExists = this.productFinder.getProduct(product);
        ifItemExists.then(()=>{            
            let resultID = this.sectionManager.getUserID(authToken);
            resultID.then(id=>{
                let result = this.cartManagement.addToUserCart(id,product);
                result.then(response=>{            
                    console.log("Received:"+authToken+"\nSent 200:"+response);            
                    res.status(200).send(response);
                }).catch(error=>{
                    console.log("Received:"+authToken+"\nSent 500:"+error);            
                    res.status(500);
                    res.statusMessage = error;
                    res.send()
                })
            }).catch(error=>{
                console.log("Received:"+authToken+"\nSent 403:"+error);            
                res.status(403);
                res.statusMessage = error;
                res.send()
            })   
        }).catch(error=>{
            console.log("Received:"+authToken+"\nSent 404:"+error);            
            res.status(404);
            res.statusMessage = error;
            res.send()
        })       
    }
    async removeFromCart(req:Request, res:Response) {
        const authToken = req.query.authToken as string;        
        const product =  parseInt(req.query.product as string);

        let ifItemExists = this.productFinder.getProduct(product);
        ifItemExists.then(()=>{            
            let resultID = this.sectionManager.getUserID(authToken);
            resultID.then(id=>{
                let result = this.cartManagement.removeFromUserCart(id,product);
                result.then(response=>{            
                    console.log("Received:"+authToken+"\nSent 200:"+response);            
                    res.status(200).send(response);
                }).catch(error=>{
                    console.log("Received:"+authToken+"\nSent 500:"+error);            
                    res.status(500);
                    res.statusMessage = error;
                    res.send()
                })
            }).catch(error=>{
                console.log("Received:"+authToken+"\nSent 403:"+error);            
                res.status(403);
                res.statusMessage = error;
                res.send()
            })   
        }).catch(error=>{
            console.log("Received:"+authToken+"\nSent 404:"+error);            
            res.status(404);
            res.statusMessage = error;
            res.send()
        })      
    }
    async getCart(req:Request, res:Response){
        const authToken = req.query.authToken as string;    

        let resultID = this.sectionManager.getUserID(authToken);
        resultID.then(id=>{
            let result = this.cartManagement.getUserCart(id);
            result.then(response=>{            
                console.log("Received:"+authToken+"\nSent 200:"+response);            
                res.status(200).send(response);
            }).catch(error=>{
                console.log("Received:"+authToken+"\nSent 500:"+error);            
                res.status(500);
                res.statusMessage = error;
                res.send()
            })
        }).catch(error=>{
            console.log("Received:"+authToken+"\nSent 403:"+error);            
            res.status(403);
            res.statusMessage = error;
            res.send()
        })    
    }
}

export default storeController