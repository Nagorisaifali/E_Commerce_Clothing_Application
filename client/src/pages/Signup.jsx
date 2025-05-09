import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    try {
        await axios.post('http://localhost:3000/user/signup', form);
        alert('Signup successful! Please login.');
        navigate('/login');
      } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

    return (
        <div className="flex pt-16 pb-16 min-h-screen bg-white">
          {/* Left image section */}
          <div className="w-1/2 hidden md:flex justify-center items-center p-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25ZLwTwMg5r2PisvnjQUHCLMGFSYztfFLlw&s"
              alt="Clothing Print"
              className="object-cover h-4/5 w-4/5 rounded-xl shadow-lg transition transform hover:scale-105"
            />
          </div>
    
          {/* Right form section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
            <h1 className="text-4xl mb-6 font-bold text-gray-900 ">Sign Up</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
              className="flex flex-col w-80 bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-lg shadow-md"
              onSubmit={handleSubmit}
            >
              <input
                className="mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <input
                className="mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                Signup
              </button>
            </form>
          </div>
        </div>
      );
}

export default Signup
