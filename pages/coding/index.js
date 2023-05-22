import React from 'react'
import axios from 'axios';
import ProblemCrad from '@/components/ProblemCrad';

const CodingPage = ({problems}) => {
  console.log(problems);
  return (
    <div className='p-10 flex items-center flex-col bg-cover' style={{backgroundImage:"url('/quiz5.jpg')"}}>
      <h1 className=' text-4xl font-semibold mb-10 text-white'>Live Challenges</h1>
      {
        problems.map((problem, index) => {
          return <ProblemCrad key={index} problem={problem}/>
        })
      }
    </div>
  )
}


export async function getServerSideProps(context) {
  let response = await axios.get('https://kccblogserver.onrender.com/problem/getAll');
  return {
    props: {problems:response.data}, // will be passed to the page component as props
  };
}

export default CodingPage