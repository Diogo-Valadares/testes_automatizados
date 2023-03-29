import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';
import delay from '../delay';


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [infoMessage, setInfoMessage] = useState('');  
  const borderAroundText: React.CSSProperties = {
    color: "black",
    fontSize: "72px",
    fontWeight: "bold",
    border: "2px solid black",
    padding: "10px",
    display: "inline-block"
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(name.length<4){
      setInfoMessage('Name is too short(less than 4 characters)');
      return;
    }
    if(name.split(" ",2).length<2){
      setInfoMessage('Name needs to be composed by at least 2 words');
      return;
    }    
    if (password !== confirmPassword) {
      setInfoMessage('Passwords do not match');
      return;
    }
    const userData = {
      email,
      name,
      password,
    };
    api.post('/api/register', userData)
      .then(async (response) => {
        console.log(response.data);
        if(response.status == 200){
          setInfoMessage('Successfully registered, redirecting to login page');          
          await delay(3000);
          navigate('/Login');
        }
        
      })
      .catch((error) => {
        console.log(error);        
      });
  };
  
  const returnToLogin = async () => {
    navigate('/Login');
  }  
  
  return (
    
    <><button 
        onClick={returnToLogin} 
        style={{fontSize: "20px",fontWeight: "bold"}}>
          Return to login
      </button>
    <div className="SignUp" style={{ textAlign: 'center' }}>
      <h1 style={borderAroundText} >FakeStore DotCom</h1>
      <h1 style={{fontSize: "50px",fontWeight: "bold"}}>Sign Up</h1>
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
          Name:
          <br />
          <input
            type="text"
            value={name}
            style={{fontSize: "20px"}}
            onChange={(event) => setName(event.target.value)}
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
        <br />
        <label style={{fontSize: "30px",fontWeight: "bold"}}>
          Confirm Password:
          <br />
          <input
            type="password"
            value={confirmPassword}
            style={{fontSize: "20px"}}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required />
        </label>
        <br /><br />
        {infoMessage && <p className="error">{infoMessage}</p>}
        <button type="submit" style={{fontSize: "20px",fontWeight: "bold"}}>Submit</button>
      </form>
    </div></>
  );
}

export default SignUp;
