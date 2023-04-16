import {Request,Response} from 'express'
import storeController from './Controller/storeController';
import UserDatabase, { IUserDatabase } from './Databases/UserDatabase';
import { ISectionManager, SectionManager } from './useCases/sectionManager';
import { IUserManagement, UserManagement } from './useCases/userManagement';
import { IProductFinder, ProductFinder } from './useCases/productFinder';
import { IProductsDatabase, ProductsDatabase } from './Databases/productsDatabase';
import { IUserCartManager, UserCartManager } from './useCases/cartManagement';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sectionManagerInstance:ISectionManager = new SectionManager()
const userDatabase:IUserDatabase = new UserDatabase();
const userManager:IUserManagement = new UserManagement(userDatabase);
const productsDatabase: IProductsDatabase = new ProductsDatabase();
const productFinder:IProductFinder = new ProductFinder(productsDatabase);
const cartManagement:IUserCartManager = new UserCartManager(userDatabase);
const controller = new storeController(sectionManagerInstance, userManager,productFinder,cartManagement);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Handle POST request to '/api/register'
app.post('/api/register', async (req: Request, res: Response) => {
  controller.signUp(req,res);
});

app.post('/api/login', async (req: Request, res: Response) => {
  controller.login(req,res);
});

app.get('/api/logoff', async (req: Request, res: Response) => {
  controller.logoff(req,res);
});

app.get('/api/getUserData', async (req: Request, res: Response) => {
  controller.getUserData(req,res);
});

app.get('/api/product',  async (req: Request, res: Response) => {
  controller.getProduct(req,res);
});

app.get('/api/products', async (req: Request, res: Response) => {
  controller.getProducts(req,res);
})
;
app.get('/api/addToCart',  async (req: Request, res: Response) => {
  controller.addToCart(req,res);
});
app.get('/api/removeFromCart', async (req: Request, res: Response) => {
  controller.removeFromCart(req,res);
});
app.get('/api/getUserCart',  async (req: Request, res: Response) => {
  controller.getCart(req,res);
});


// Start server
app.listen(4001, () => {  
  console.log('Server started on port 4001');
});

