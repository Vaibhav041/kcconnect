import { updateUser } from '@/utils/redux/userSlice';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';


const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleClick =async () => {
    let user = await axios.post('https://kccblogserver.onrender.com/auth/register', {
      name:name,
      email:email,
      password:password,
      isTeacher:(role === "Teacher")
    })
    if (user.status === 200) {
      dispatch(updateUser(user.data));
      router.push('/');
    }

  }

  return (
    <div className='flex justify-center items-center h-[91vh] bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover' style={{backgroundImage:"url('/bg6.jpg')"}}>
      <div className=' shadow-2xl h-[60%] w-[23%] bg-gray-100  p-10 rounded-xl'>
        <h1 className='text-3xl text-center'>SignUp</h1>
        <div className='flex flex-col gap-2 mt-4 mx-5'>
          <input type='text' placeholder="Name" className='rounded-md p-[2px] outline-none' onChange={(e) => setName(e.target.value)}/>
          <input type='email' placeholder='Your college Email' className='rounded-md p-[2px] outline-none' onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' className='rounded-md p-[2px] outline-none' onChange={(e) => setPassword(e.target.value)}/>
          <select className='text-black rounded-md outline-none' onChange={(e) => setRole(e.target.value)}>
            <option>Student</option>
            <option>Teacher</option>
          </select>
          <button className='bg-gradient-to-r from-cyan-500 to-blue-500 p-1 font-semibold mt-5 rounded-full text-white' onClick={handleClick}>Submit</button>
          <div className='mt-8 text-center'>Already have and account? <Link href='/login' className="text-blue-900">Login</Link></div>
        </div>
      </div>
    </div>
  )
}

export default Signin