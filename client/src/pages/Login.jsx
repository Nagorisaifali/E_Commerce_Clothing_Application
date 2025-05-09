import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {


    const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('All fields are required');
      return;
    }
    try {
        const res = await axios.post('http://localhost:3000/user/login', form);
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

    return (
        <div className="flex pt-16 pb-16 min-h-screen">
          <div className="w-1/2 hidden md:block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25ZLwTwMg5r2PisvnjQUHCLMGFSYztfFLlw&s"
              alt="Fashion Design"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
            <h1 className="text-3xl mb-6 font-bold">Welcome Back</h1>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form className="flex flex-col w-80" onSubmit={handleSubmit}>
              <input className="mb-3 p-2 border rounded" placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="mb-3 p-2 border rounded" type="password" placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">Login</button>
            </form>
          </div>
        </div>
      );
}

export default Login
