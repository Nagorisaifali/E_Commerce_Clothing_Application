import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate() ; 

  function getProduct() {
    axios.get('http://localhost:3000/user/products',{
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }

  useEffect(() => {
      getProduct() 
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen pt-16 pb-16 bg-aliceblue">
      <h1 className="text-4xl font-bold mb-4">Welcome to ClothPrint</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">
        Customize and print your own clothing styles with ease.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl">
        {products.map(product => (
          <div onClick={() => navigate(`/product-details` , {
            state : {
              product 
            }
          })} key={product._id} >
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">${product.description}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
