import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddProduct from './pages/AddProduct';
import OrderPlacement from './pages/OrderPlacement';
import MyOrders from './pages/MyOrder';
import EditProducts from './pages/EditProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/place-order/:productId" element={<OrderPlacement />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/edit-products" element={<EditProducts />} />
          </Routes>
        </main>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;

