import {Request,Response} from 'express'
import storeController from './Controller/storeController';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const controller = new storeController();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request to '/api/register'
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  controller.signUp(email, name, password);
  console.log("received requisition:email-"+email+" name-"+name);
  res.send('Registration successful!').status(200);
});

app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let authtoken = await controller.login(email, password);
  console.log("received requisition:email-"+email+ "\nReturning authToken:"+authtoken);
  res.send(authtoken).status(200);
});


// Start server
app.listen(4000, () => {  
  console.log('Server started on port 4000');
});
