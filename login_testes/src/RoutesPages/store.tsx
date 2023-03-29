import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../PageHeader';

function Store() {
  const navigate = useNavigate();
  const [selectedProduct, addProductToCart] = useState('');
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
  
  const addToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const authToken = localStorage.getItem('authToken');
    const cartAddition = {
      authToken,
      selectedProduct
    };
    api.post('/api/addToCart', cartAddition)
      .then(async (response) => {
        if(response.status == 200){
          localStorage.setItem('authToken', response.data);
          console.log(localStorage.getItem('authToken'));
          navigate('/Store');
        }
        
      })
      .catch((error) => {
        console.log(error);        
      });
  };
  const goToSignUp = async () => {
    navigate('/SignUp');
  }

  return (
    <><Header/>
    <div className="Store" style={{ textAlign: 'center' }}>
      <p style={{ fontSize: "50px", fontWeight: "bold" }}>Store</p>
    </div></>
  );
}

export default Store;