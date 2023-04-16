import React, { useEffect, useState } from 'react';
import { Product } from '../Entities/ProductItem';
import api, { baseURL } from '../api';


const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
      let userCart:[number,number][];
      const authToken = localStorage.getItem('authToken');
      api.get('/api/getUserCart', { params: { authToken: authToken} })
      .then(response => {
        userCart = response.data as [number,number][];
        api.get('/api/products').then(response => {
          let receivedProducts = JSON.parse(response.data) as Product[];
          console.log(receivedProducts);
          const productsWithCartCount = receivedProducts.map(product => ({
            ...product,
            cartCount: findCartCount(userCart,product.id)
          }));
          setProducts(productsWithCartCount);
        });
      }).catch((error)=>{
        console.log(error);
      });      
    }, []);
    
    const findCartCount = (cart: [number,number][],id:number) => {
      console.log(cart);
      let index = cart.findIndex(p => p[0] === id);
      return index === -1 ? 0: cart[index][1];
    }

    const css = `
    .grid-container {        
        display: flex;
        flex-wrap: wrap;
        grid-gap: 50px;
        justify-content: center;
        align-items: center;
      }
      
      .grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      
      .grid-item img {
        width: 100%;
        height: auto;
        max-width: 500px;
        margin-bottom: 10px;
      }
      
      .grid-item h2 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 1.5;
      }
      
      .grid-item p {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
      }
      
      .grid-item button {
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      
      .grid-item button:hover {
        background-color: #0069d9;
      }
      
      .grid-item button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
      }
    }`

    const addToCart= (product: Product) => {
      const authToken = localStorage.getItem('authToken');
      api.get('/api/addToCart', { params: { authToken: authToken, product: product.id } })
        .then(async (response) => {
          if(response.status == 200){
            console.log(response);
            const newProducts = products.map(p => {
              if (p.id === product.id) {
                return { ...p, cartCount: p.cartCount + 1 };
              } else {
                return p;
              }
            });
            setProducts(newProducts);
          }        
        })
        .catch((error) => {
          console.log(error);        
        });   
    };
  
    function removeFromCart(product: Product): void {
      const authToken = localStorage.getItem('authToken');
      api.get('/api/removeFromCart', { params: { authToken: authToken, product: product.id } })
        .then(async (response) => {
          if(response.status == 200){
            console.log(response);
            const newProducts = products.map(p => {
              if (p.id === product.id) {
                return { ...p, cartCount: p.cartCount - 1 };
              } else {
                return p;
              }
            });
            setProducts(newProducts);
          }        
        })
        .catch((error) => {
          console.log(error);        
        });   
    }

    return ( 
      <div>
        <style>
            {css}
        </style>
        <div className="grid-container">
        {products.map((product) => (
            <div className="grid-item" key={product.id}>
            <img src={baseURL+"/"+product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            {product.cartCount > 0 && (
              <>{product.cartCount} in you cart.<button onClick={() => removeFromCart(product)}>Remove From Cart</button>   </>           
            )}
            </div>
        ))}
        </div>
      </div>  
    );
  };

export default ProductGrid;