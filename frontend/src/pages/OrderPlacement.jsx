import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 



function OrderPlacement() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
      
    const fetchProducts = async () =>{
      try{
           const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
           console.log('Products fetched', response.data);
           setProduct(response.data);
      }
      catch(error){
         console.error('Error fetching products', error);
      }
  }

  fetchProducts();

}, [productId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/orders/createOrder', 
      {
        productId,
        quantity,
      },
      {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      toast.success('Order placed successfully');


      console.log('Order placed', response.data);
    }

    catch(error) {

      console.error('Order placement error', error);
      toast.error(' Sign in to place order');

    }
   
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Place Order</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
       <ToastContainer />
    </div>
  );
}

export default OrderPlacement;

