import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={product.imgUrl} alt={product.productName} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-lg font-bold mb-4">${product.price}</p>
        <Link
          to={`/place-order/${product.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Place Order
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;

