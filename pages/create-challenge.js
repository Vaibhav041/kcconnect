import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const CreateChallenge = () => {
  const [problem, setProblem] = useState('');
  const [test, setTest] = useState([]);
  const [sol, setSol] = useState([]);
  const [tags, setTags] = useState([]);
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [preview, setPreview] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const router = useRouter();

  const addTestCase = () => {
    setTest(prev => {
      return [
        ...prev,
        a
      ]
    })
    setSol(prev => {
      return [
        ...prev,
        b
      ]
    })
    setA('');
    setB('');
  }
  const handleClick = () => {
    addTestCase();
    setPreview(true);
  }
  const addChallenge = async() => {
    let response = await axios.post('https://kccblogserver.onrender.com/problem/add', {
      statement:problem,
      testcase:test,
      solutions:sol,
      tags:tags,
      userId:currentUser._id
    })
    if (response.status === 200) {
      router.push('/coding')
    }

  }

  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[91vh] flex justify-center items-center bg-cover' style={{backgroundImage:"url('/bg5.png')"}}>
      <div className='w-[30%] text-black p-10 rounded-xl bg-gray-100 flex flex-col gap-2'>
        {!preview ?<>
        <h1 className='font-bold text-lg'>Problem statement:</h1>
        <input type='text' placeholder='Write here' className='p-2' onChange={(e) => setProblem(e.target.value)}/>
        <h1 className='font-bold text-lg'>Test Case 0{test.length + 1}.</h1>
        <input className='p-2' type='text' placeholder='Input' onChange={e => setA(e.target.value)} value={a}/>
        <input type='text' placeholder='Solution' className='p-2' onChange={e => setB(e.target.value)} value={b}/>
        <div className='text-center'><button className='bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-10 rounded-full mt-3 text-white font-semibold'  onClick={addTestCase}>Add Testcase</button></div>
        <h1 className='font-bold text-lg'>Tags:</h1>
        <input type='text' placeholder='difficulty, category' className='p-2' onChange={e => setTags(e.target.value)}/>
        <button className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-1 font-bold text-white mt-5' onClick={handleClick}>Next</button>
        </> : 
        <>
          <h1 className='text-xl font-bold'>Preview</h1>
          <p className='text-lg font-semibold'>Statement: {problem}</p>
          <p className='text-lg font-semibold'>Total testcases: {test.length}</p>
          <button className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-1 font-bold text-white mt-5' onClick={addChallenge}>Add Challenge</button>
        </>}
      </div>

    </div>
  )
}

export default CreateChallenge