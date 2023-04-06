import {Request,Response} from 'express'
import storeController from './Controller/storeController';
import UserDatabase, { IUserDatabase } from './Databases/UserDatabase';
import { ISectionManager, SectionManager } from './Databases/sectionManager';
import { IUserManagement, UserManagement } from './useCases/userManagement';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sectionManagerInstance:ISectionManager = new SectionManager()
const userDatabase:IUserDatabase= new UserDatabase();
const userManager:IUserManagement= new UserManagement(userDatabase,sectionManagerInstance);
const controller = new storeController(userManager);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request to '/api/register'
app.post('/api/register', async (req: Request, res: Response) => {
  controller.signUp(req,res);
});

app.post('/api/login', async (req: Request, res: Response) => {
  controller.login(req,res);
});

app.post('/api/logoff', async (req: Request, res: Response) => {
  controller.logoff(req,res);
});

app.post('/api/getUserData', async (req: Request, res: Response) => {
  controller.getUserData(req,res);
});

// Start server
app.listen(4001, () => {  
  console.log('Server started on port 4001');
});

