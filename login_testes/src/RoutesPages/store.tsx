import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../PageHeader';

function Store() {
  const navigate = useNavigate();  
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
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
  useEffect(() => {
    const promises = [];
    for (let i = 0; i < 4; i++) {
      let imageURL = `/product${i}.jpg`;
      promises.push(
        api.get(imageURL, { responseType: 'blob' })
          .then(response => {
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            return new Promise(resolve => {
              reader.onload = () => {
                const imageSrc = reader.result;
                resolve(imageSrc as string);
              };
            });
          })
          .catch(error => {
            console.error(error);
          })
      );
    }
    Promise.all(promises).then(imageSrcs => {
      setImageSrcs(imageSrcs as string[]);
    });
  }, []);
  const goToSignUp = async () => {
    navigate('/SignUp');
  }

  return (
    <><Header/>
    <div className="Store" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {imageSrcs.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt="Product" />
      ))}
      </div>
    </div></>
  );
}

export default Store;