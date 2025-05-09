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
    <main className='flex justify-center items-center h-screen'>
      <div className='flex max-w-[400px] flex-col justify-center items-center p-2 rounded-lg bg-slate-800 '>
      <img className='w-full max-h-[200px]  object-cover' src={product.images[0]} alt="imgs" />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>

        <button onClick={handlePayment}  className='bg-blue-500 text-white p-2 rounded-md'>Buy Now</button>
      </div>
    </main>
  )
}

export default ProductDetails
