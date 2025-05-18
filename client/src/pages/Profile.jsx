

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";


const Profile = () =>  {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:3000/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-16 pb-16 flex justify-center items-center bg-aliceblue">
      <div className="bg-white p-6 rounded-lg shadow-lg w-110 ">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <div className='flex flex-row gap-7'>
            <div className='text-[150px] font-bold'>
            <FaUserAlt />
          </div>
          <div className='text-[18px] flex flex-col gap-3'>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <div className='flex gap-4 mt-3 ml-5 items-center'>
          <button className='bg-purple-500 text-white hover:bg-yellow-500 text-15px rounded h-[30px] w-[100px] '>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile ; 