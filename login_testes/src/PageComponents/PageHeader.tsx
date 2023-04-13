import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AxiosError } from 'axios';
import User from '../Entities/user';

function Header() {  
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');  
  const [userEmail, setUserEmail] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const borderAroundText: React.CSSProperties = {
    color: "black",
    fontSize: "72px",
    fontWeight: "bold",
    border: "2px solid black",
    padding: "10px",
    display: "inline-block",
  };
  const bigText: React.CSSProperties = {
    color: "black",
    fontSize: "36px",
    fontWeight: "bold",
    padding: "10px",
  };  
  
  useEffect(() => {getUserName()});

  const getUserName = async () => {
    let authToken = localStorage.getItem('authToken');
    if(authToken === null){
      navigate("/Login");
    }
    console.log("Sending hash " + authToken);
    api.get('/api/getUserData?authToken='+authToken)
      .then((response) => {          
        if(response.status == 200){          
          console.log(response.status+" "+response.data);
          setUserName(response.data.name);
          setUserEmail(response.data.email);
        }
        else{          
          console.log(response.status+" "+response.data);
          setUserName("ERROR WHILE COMUNICATING TO BACKEND");
          setUserEmail("ERROR WHILE COMUNICATING TO BACKEND")          
          navigate("/Login");
        }
        
      })
      .catch((error:AxiosError) => {          
        setUserName(error.message);
        setUserEmail(error.message);
        navigate("/Login");
      });
  };

  const logoff = async () => {
    let authToken = localStorage.getItem('authToken');
    if(authToken === null){
      navigate("/Login");
    }
    api.get('/api/logoff?authToken=' + authToken)
      .then((response) => {          
        if(response.status == 200){          
          console.log(response.status+" "+response.data);          
          localStorage.setItem('authToken',"");
          navigate("/Login");
        }
        else{          
          console.log(response.status+" "+response.data);
          setUserName("ERROR WHILE COMUNICATING TO BACKEND");
          setUserEmail("ERROR WHILE COMUNICATING TO BACKEND")
        }
        
      })
      .catch(() => {          
        setUserName("ERROR WHILE COMUNICATING TO BACKEND");
        setUserEmail("ERROR WHILE COMUNICATING TO BACKEND")
      });
  }
  return (
    <div className="Store" style={{ display: 'flex', justifyContent: 'space-between'}}>     
      <header style={borderAroundText} >FakeStore DotCom</header>
      <header style={{fontSize: "30px",fontWeight: "bold", marginLeft: "auto"}}>Logged as:
        <label> {userName}</label>
      </header>
      <button type="submit" onClick={logoff}style={{fontSize: "20px",fontWeight: "bold", height:"30px",marginLeft: '4%'}}>Log off</button>
    </div>
    );
}
export default Header;