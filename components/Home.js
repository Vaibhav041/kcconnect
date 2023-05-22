import React from 'react'

const Home = () => {
  return (
    <div className='bg-fixed bg-cover h-[91vh] bg-top flex flex-col justify-center items-center' style={{backgroundImage:"url('/bg.jpg')"}}>
      <p className='text-4xl text-gray-500 underline'>KCC</p> <span id='spin' className='text-8xl text-blue-950'></span>
    </div>
  )
}

export default Home