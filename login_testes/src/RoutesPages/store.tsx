import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Header from '../PageComponents/PageHeader';
import ProductGrid from '../PageComponents/Product';
import { Product } from '../Entities/ProductItem';

function Store() {
  const navigate = useNavigate(); 
  return (
    <><Header/>  
    <div className="Store" style={{ textAlign: 'center' }}>s
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <ProductGrid/>
      </div>
    </div></>
  );
}

export default Store;