import React from 'react';
import ProductItem from './ProductItem';
import { useState, useEffect } from 'react';
import axios from 'axios';


function ProductList() {
  

    const [products, setProducts] = useState([]);
    const BACKEND_URL = "https://jobkey-work-git-main-btrezzys-projects.vercel.app"

    const fetchProducts = async () =>{
      try{
        const response = await axios.get(`${BACKEND_URL}/api/products`);
        console.log('Products fetched', response.data);
        setProducts(response.data);

        console.log('Products fetched', response.data);
      }
      catch(error){
        console.error('Error fetching products', error);
      }
    }

    useEffect(() => {
      fetchProducts();
    }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

