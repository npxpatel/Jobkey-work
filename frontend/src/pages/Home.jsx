import React from 'react';
import ProductList from '../components/ProductList';

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Marketplace</h1>
      <ProductList />
    </div>
  );
}

export default Home;

