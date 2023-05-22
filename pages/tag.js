import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import BlogCard from '@/components/BlogCard';

const Tags = ({blogs}) => {
    const router = useRouter();
    const tag = router.query.tag;
  return (
    <div className='p-10'>
      <h1 className='font-bold text-3xl underline text-center'>{tag}</h1>
      <div className="flex flex-col mx-8 mt-10">
          {blogs.map((item, index) => {
            return (
              <div className="my-1" key={index}>
                <BlogCard item={item} />
              </div>
            );
          })}
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let response = await axios.get(`https://kccblogserver.onrender.com/blog/category/${context.query.tag}`);
  return {
    props: {blogs:response.data}, // will be passed to the page component as props
  };
}

export default Tags