import React from 'react'
import axios from 'axios'
import QuizCard from '@/components/QuizCard'

const Quiz = ({quizzes}) => {
    console.log(quizzes);
  return (
    <div className='flex items-center flex-col pt-10 bg-cover' style={{backgroundImage:"url('/quiz5.jpg')"}}>
        <h1 className=' text-4xl font-semibold mb-10 text-gray-50'>Live Quizzes</h1>
        {
        quizzes.map((quiz, index) => {
          return <QuizCard key={index} quiz={quiz}/>
        })
      }
    </div>
  )
}

export async function getServerSideProps(context) {
    let response = await axios.get('https://kccblogserver.onrender.com/quiz/getAll');
    return {
      props: {quizzes:response.data}, // will be passed to the page component as props
    };
}

export default Quiz