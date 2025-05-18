// import React , { useCallback } from 'react'
// import {  useLocation } from 'react-router-dom'
// import { useRazorpay } from "react-razorpay"
// import axios from 'axios';

// const ProductDetails = () => {

//   const { Razorpay } = useRazorpay();
//   const location = useLocation() ; 
//   const product = location.state.product ;  

//   const handlePayment = useCallback(async () => {
    

//    const order = ( await axios.get('http://localhost:3000/user/order/'+ product._id , {
//     headers : {
//       'Authorization' : `Bearer ${localStorage.getItem('token')}`  , 
//     }
//    })).data.order  ;  

//     console.log(order)

//     const options = {
//       key: "rzp_test_hW7K7ggogZvLp0", 
//       amount: order.amount , // Amount in paise
//       currency: order.currency ,
//       name: "Test Company",
//       description: "Test Transaction",
//       order_id: order.id , // Generate order_id on server  
//       handler: async (res) => {
//         alert("Payment Successful!");

//         const response = await axios.post('http://localhost:3000/user/verify/' + order.id, {
//             paymentId: res.razorpay_payment_id,
//             orderId: res.razorpay_order_id,
//             signature: res.razorpay_signature,
//         }, {
//           headers: {
//             Authorization : `Bearer ${localStorage.getItem('token')}`,
//           },
//       } );
//         console.log(response) ; 
        

//       },
//       prefill: {
//         name: "John Doe",
//         email: "john.doe@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     const razorpayInstance = new Razorpay(options);
//     razorpayInstance.open();
//   } ); 


//   return (

//     <main className='flex justify-center items-center h-screen flex-col  '>
//       <div className='shadow-blue-300 '>
//         <h1 className='text-[30px] font-bold  text-black mb-2 text-center'>Product Details</h1>
//           <div className='flex max-w-[600px] flex-row justify-center items-center p-2 rounded-lg gap-4 '>
        
//               <div>
//                 <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t" />
//               </div>
//               <div className="p-4 flex gap-2 flex-col">
//                 <h3 className="text-xl font-bold">{product.name}</h3>
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="text-gray-600">${product.price}</p>
//                 <button onClick={handlePayment}  className='bg-blue-500 text-white p-2 rounded-md hover:bg-yellow-400'>Buy Now</button>
//               </div>
        
        
//       </div>
//       </div>
      
//     </main>
//   )
// }

// export default ProductDetails


import React, { useCallback, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useRazorpay } from "react-razorpay";
import axios from 'axios';

const ProductDetails = () => {
  const { Razorpay } = useRazorpay();
  const location = useLocation();
  const product = location.state.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Extra charges based on size
  const sizeExtraPrice = {
    S: 0,
    M: 0,
    L: 10,
    XL: 20,
    XXL: 40
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    const extra = selectedSize ? sizeExtraPrice[selectedSize] : 0;
    return (product.price + extra) * quantity;
  }, [product.price, selectedSize, quantity]);

  const handlePayment = useCallback(async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const order = (await axios.get(`http://localhost:3000/user/order/${product._id}?quantity=${quantity}&size=${selectedSize}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })).data.order;

    const options = {
      key: "rzp_test_hW7K7ggogZvLp0",
      amount: order.amount,
      currency: order.currency,
      name: "Test Company",
      description: `Purchase of ${product.name} (Size: ${selectedSize})`,
      order_id: order.id,
      handler: async (res) => {
        alert("Payment Successful!");
        const response = await axios.post(`http://localhost:3000/user/verify/${order.id}`, {
          paymentId: res.razorpay_payment_id,
          orderId: res.razorpay_order_id,
          signature: res.razorpay_signature,
          size: selectedSize,
          quantity,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }, [product._id, quantity, selectedSize]);

  return (
    <main className='flex justify-center items-center min-h-screen p-4 bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Product Details</h1>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-shrink-0'>
            <img src={product.images[0]} alt={product.name} className="w-64 h-64 object-cover rounded" />
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>

            {/* Size Selector */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Select Size:</label>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 rounded border text-sm ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-blue-100'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size} {sizeExtraPrice[size] > 0 ? `(+₹${sizeExtraPrice[size]})` : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Total Price Display */}
            <div className="text-xl font-bold text-green-600">
              Total: ₹{totalPrice.toFixed(2)}
            </div>

            <button
              onClick={handlePayment}
              className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200'
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
