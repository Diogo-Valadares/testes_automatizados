import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Header() {
  const navigate = useNavigate();
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
  
  const logOff = async () => {
    navigate('/Login');
  }

  return (
    <div className="Store" style={{ display: 'flex', justifyContent: 'space-between'}}>     
      <header style={borderAroundText} >FakeStore DotCom</header>
      <header style={{fontSize: "30px",fontWeight: "bold", marginLeft: "auto"}}>Logged as:</header>
      <button type="submit" style={{fontSize: "20px",fontWeight: "bold", height:"30px",marginLeft: '4%'}}>Log off</button>
    </div>
  );
}

export default Header;