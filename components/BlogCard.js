import React from 'react'
import { useRouter } from 'next/router'

const BlogCard = ({item}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push({pathname:'/blogpage', query:{blogId:item._id}});
  }
  return (
    <>
    <div className='flex mb-5 justify-between  bg-gradient-to-r from-cyan-500 to-blue-500 p-2 shadow-xl hover:shadow-2xl rounded-md'>
        <div className='w-2/3 px-5 pt-5'>
            <h1 className='text-lg font-bold cursor-pointer text-gray-900' onClick={handleClick}>{item.title}</h1>
            <h2 className='text-white font-medium mb-10 cursor-pointer' onClick={handleClick}>{item.description.slice(0, 100)}...</h2>
            <div className='text-white text-sm'><span>{item.date}</span> · <span className='bg-gray-400 p-[0.5rem] rounded-full'>{item.category}</span></div>
        </div>
        <img className='cursor-pointer' src={item.img} onClick={handleClick}/>
    </div>
    {/* <hr className='border border-solid border-gray-300'/> */}
    </>
  )
}

export default BlogCard