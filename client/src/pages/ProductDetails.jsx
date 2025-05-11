import React , { useCallback } from 'react'
import {  useLocation } from 'react-router-dom'
import { useRazorpay } from "react-razorpay"
import axios from 'axios';

const ProductDetails = () => {

  const { Razorpay } = useRazorpay();
  const location = useLocation() ; 
  const product = location.state.product ;  

  const handlePayment = useCallback(async () => {
    

   const order = ( await axios.get('http://localhost:3000/user/order/'+ product._id , {
    headers : {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`  , 
    }
   })).data.order  ;  

    console.log(order)

    const options = {
      key: "rzp_test_TCB8O9JA19FLn2",
      amount: order.amount , // Amount in paise
      currency: order.currency ,
      name: "Test Company",
      description: "Test Transaction",
      order_id: order.id , // Generate order_id on server  
      handler: async (res) => {
        alert("Payment Successful!");

        const response = await axios.post('http://localhost:3000/user/verify/' + order.id, {
            paymentId: res.razorpay_payment_id,
            order_id: res.razorpay_order_id,
            signature: res.razorpay_signature,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      } );
        console.log(response) ; 

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
  },[ Razorpay ]); 


  return (

    <main className='flex justify-center items-center h-screen flex-col'>
      <h1 className='text-[30px] font-bold  text-black mb-2'>Product Details</h1>
      <div className='flex max-w-[400px] flex-col justify-center items-center p-2 rounded-lg '>
        
          <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-t" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">${product.description}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>
        
        <button onClick={handlePayment}  className='bg-blue-500 text-white p-2 rounded-md'>Buy Now</button>
      </div>
    </main>
  )
}

export default ProductDetails
