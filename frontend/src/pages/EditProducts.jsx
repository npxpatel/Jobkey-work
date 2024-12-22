import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function EditProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/my-products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {

      const { id, name, description, price, imageUrl } = editingProduct;

      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { productName: name, description, price, imgUrl: imageUrl },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setProducts((prev) => prev.map((p) => (p.id === id ? response.data.product : p)));
      setEditingProduct(null);
       toast.success('Product Edited!');
     
            
      
    } catch (error) {
      console.error('Error updating product:', error);
      toast.failed('Product not Edited!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit My Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              {editingProduct?.id === product.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editingProduct.name}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editingProduct.description}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editingProduct.price}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    step="0.01"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Save
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <p className="text-lg font-bold mb-4">${product.price}</p>
                  <button
                    onClick={() => setEditingProduct({ ...product })}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditProducts;
