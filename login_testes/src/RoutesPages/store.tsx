import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../PageComponents/PageHeader';
import ProductGrid from '../PageComponents/Product';
import { Product } from '../Entities/ProductItem';

function Store() {
  const navigate = useNavigate();  
  //const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, addProductToCart] = useState('');
  
  useEffect(() => {
    api.get('/api/products').then(response => {
      let receivedProducts = JSON.parse(response.data) as Product[];
      console.log(receivedProducts);
      setProducts(receivedProducts);
    });
  }, []);
  
  const addToCart= (product: Product) => {
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

  return (
    <><Header/>  
    <div className="Store" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/*{imageSrcs.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt="Product" />
      ))}*/}
      {products.length > 0 && (
        <ProductGrid products={products} onAddToCart={addToCart} />
      )}
      </div>
    </div></>
  );
}

export default Store;

/*promises.push(
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
);*/