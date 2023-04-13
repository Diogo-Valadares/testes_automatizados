import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AxiosError } from 'axios';

function Login() {    
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const borderAroundText: React.CSSProperties = {
    color: "black",
    fontSize: "72px",
    fontWeight: "bold",
    border: "2px solid black",
    padding: "10px",
    display: "inline-block"
  };
  const bigText: React.CSSProperties = {
    color: "black",
    fontSize: "36px",
    fontWeight: "bold",
    padding: "10px",
  };
  
  window.addEventListener('load', () => {checkIfItsLogged()});
  const checkIfItsLogged = async () => {
    let authToken = localStorage.getItem('authToken');
    if(authToken == "") return;
    const userData = {
      authToken
    };
    api.post('/api/getUserData', userData)
      .then((response) => {          
        if(response.status == 200){          
          navigate("/Store");
        }        
      });
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    api.post('/api/login', userData)
      .then((response) => {          
        if(response.status == 200){          
          console.log(response.status+" "+response.data);
          localStorage.setItem('authToken', response.data);
          navigate('/Store');          
        }
        else{          
          console.log(response.status+" "+response.data.message);  
          setInfoMessage(response.data.message)                
        }
        
      })
      .catch((error:AxiosError) => {  
        console.log(error.response?.statusText as string);  
        setInfoMessage(error.response?.statusText as string)   
      });
  };
  const signUp = async () => {
    navigate('/SignUp');
  }

  return (
    <div className="Login" style={{ textAlign: 'center' }}>     
      <h1 style={borderAroundText} >FakeStore DotCom</h1>
      <h1 style={{fontSize: "50px",fontWeight: "bold"}}>Login</h1>
      <br />
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'center' }}>
        <label style={{fontSize: "30px",fontWeight: "bold"}}>
          Email:
          <br />
          <input
            type="email"
            value={email}
            style={{fontSize: "20px"}}
            onChange={(event) => setEmail(event.target.value)}
            required />
        </label>
        <br />
        <label style={{fontSize: "30px",fontWeight: "bold"}}>
          Password:
          <br />
          <input
            type="password"
            value={password}
            style={{fontSize: "20px"}}
            onChange={(event) => setPassword(event.target.value)}
            required />
        </label>
        <br /><br />
        {infoMessage && 
          <p className="error" style={{fontSize: "20px", color: "red",fontWeight: "bold"}}>
            {infoMessage}
          </p>
        }
        <button type="submit" style={{fontSize: "20px",fontWeight: "bold"}}>Log in</button>
      </form>
      <h1 style={{fontSize: "30px",fontWeight: "bold"}}>or</h1>
      <button onClick={signUp} style={{fontSize: "20px",fontWeight: "bold"}}>Sign Up</button>
    </div>
  );
}

export default Login;


