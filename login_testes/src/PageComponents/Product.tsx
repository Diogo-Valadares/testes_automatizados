import React from 'react';
import { Product } from '../Entities/ProductItem';
import { baseURL } from '../api';

interface Props{
  products: Product[];
  onAddToCart: (product: Product) => void;
};

const ProductGrid: React.FC<Props> = ({ products, onAddToCart }) => {
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

    return ( 
      <html>
        <style>
            {css}
        </style>
        <div className="grid-container">
        {products.map((product) => (
            <div className="grid-item" key={product.id}>
            <img src={baseURL+"/"+product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            </div>
        ))}
        </div>
      </html>  
    );
  };

export default ProductGrid;