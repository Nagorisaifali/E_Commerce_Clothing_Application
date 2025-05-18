
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
      © {new Date().getFullYear()} Shop<span className='text-xl text-green-400' >S</span>y . All rights reserved.
    </footer>
  );
}