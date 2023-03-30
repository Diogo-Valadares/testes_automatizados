import {Request,Response} from 'express'
import storeController from './Controller/storeController';
import UserDatabase, { IUserDatabase } from './Databases/UserDatabase';
import { ISectionManager, SectionManager } from './useCases/sectionManager';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sectionManagerInstance:ISectionManager = new SectionManager()
const userDatabase:IUserDatabase= new UserDatabase();
const controller = new storeController(sectionManagerInstance,userDatabase);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request to '/api/register'
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  let result = controller.signUp(email, name, password);
  result.then(async (response) => {
    console.log("received requisition:email-"+email+" name-"+name);
    res.status(200).send('Registration successful!');
  })
  .catch((error) => {   
    console.log("failed requisition:email-"+email+" name-"+name);
    res.status(400).send('Registration failed!'); 
  });
 
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let result = controller.login(email, password);
  result.then(async (response) => {
    console.log("received login:email-"+email);
    res.status(200).send(response);
  })
  .catch((error) => {   
    console.log("failed login:email-"+email);
    res.status(400).send(error); 
  });
});


// Start server
app.listen(4000, () => {  
  console.log('Server started on port 4000');
});
