import { updateUser } from '../utils/redux/userSlice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick =async () => {
    let user = await axios.post('https://kccblogserver.onrender.com/auth/login', {
      email:email,
      password:password,
    })
    if (user.status === 200) {
      dispatch(updateUser(user.data));
      router.push('/');
    }

  }
  return (
    <div className='flex justify-center items-center h-[91vh] bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover' style={{backgroundImage:"url('/bg6.jpg')"}}>
    <div className=' shadow-2xl  w-[23%] bg-gray-100  p-10 rounded-xl'>
      <h1 className='text-3xl text-center'>Login</h1>
      <div className='flex flex-col gap-2 mt-4 mx-5'>
        <input type='email' placeholder='Your college Email' className='rounded-md p-[2px] outline-none' onChange={(e) => setEmail(e.target.value)}/>
        <input type='password' placeholder='Password' className='rounded-md p-[2px] outline-none' onChange={(e) => setPassword(e.target.value)}/>    
        <button className='bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-semibold mt-5 rounded-full text-white' onClick={handleClick}>Submit</button>
      </div>
    </div>
  </div>
  )
}

export default Login