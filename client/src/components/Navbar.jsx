
import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="text-xl font-bold">Shop<span className='text-2xl text-green-400'>S</span>y</div>
      <div className='flex justify-between gap-3 '>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/signup" className="hover:text-yellow-400">Signup</Link>
          <Link to="/login" className="hover:text-yellow-400">Login</Link>
          <Link to="/about" className="mr-4 hover:text-yellow-400">about</Link>
          <Link to="/help" className="hover:text-yellow-400">help</Link> 
        </div>
        <div>
          <Link to="/me"  className="flex mt-1 hover:text-yellow-400"><FaRegUser/></Link>
        </div>
      </div>
      
    </nav>
  );
}  