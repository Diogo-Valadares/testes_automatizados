import React from 'react';
import ReactDOM from 'react-dom/client';
import SignUp from './RoutesPages/signUp';
import Login from './RoutesPages/login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from './RoutesPages/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>    
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/Login" Component={Login} />
        <Route path="/SignUp" Component={SignUp}/>        
        <Route path="/Store" Component={Store}/>         
      </Routes>
    </BrowserRouter>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
