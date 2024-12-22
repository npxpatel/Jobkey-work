import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Marketplace</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
          <li><Link to="/add-product" className="hover:text-blue-200">Add Product</Link></li>
          <li><Link to="/edit-products" className="hover:text-blue-200">Edit Products</Link></li>
          <li><Link to="/my-orders" className="hover:text-blue-200">My Orders</Link></li>
          <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
          <li><Link to="/signup" className="hover:text-blue-200">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

