import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const CreateQuiz = () => {
    const [page, setPage] = useState(0);
    const [topic, setTopic] = useState('');
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [statement, setStatement] = useState('');
    const [op1, setOp1] = useState('');
    const [op2, setOp2] = useState('');
    const [op3, setOp3] = useState('');
    const [op4, setOp4] = useState('');
    const [ans, setAns] = useState('');

    const currentUser = useSelector(state => state.user.currentUser);
    const router = useRouter();


    const setStageOne = () => {
        setPage((prev) => prev+1);
    }
    const setStageTwo = () => {
        setQuestions((prev) => {
            return [
                ...prev,
                {
                    question:statement,
                    choices:[op1, op2, op3, op4],
                    correctAnswer:ans
                }
            ]
        })
        setPage(prev => prev+1);
        setAns('');
        setOp1('');
        setOp2('');
        setOp3('');
        setOp4('');
        setStatement('');
    }
    const addQuiz = async() => {
        console.log(questions);
        let response = await axios.post('https://kccblogserver.onrender.com/quiz/add', {
            topic:topic,
            totalQuestions:totalQuestions,
            questions:questions,
            userId:currentUser._id
        })
        if (response.status === 200) {
            router.push('/quiz');
        }
    }
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-[91vh] flex justify-center items-center' style={{backgroundImage:"url('/bg5.png')"}}>
        <div className='w-[30%] text-black p-10 rounded-xl bg-gray-100 flex flex-col gap-2'>
            {page === 0 ? <>
                <h1 className='text-xl font-bold'>Topic:</h1>
                <input className='p-2' type='text' placeholder='your quiz topic' onChange={(e) => setTopic(e.target.value)}/>
                <h1 className='text-xl font-bold'>Total questions</h1>
                <input className='p-2' type='number' placeholder='0' onChange={(e) => setTotalQuestions(e.target.value)}/>
                <button className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-1 font-bold text-white mt-10' onClick={setStageOne}>Next</button>
            </> : 
            <>
                {page <= Number(totalQuestions) ? <>
                <h1 className='font-bold text-xl'>Ques 0{page}.</h1>
                <input type='text' placeholder='Question statement' className='p-2' onChange={(e) => setStatement(e.target.value)} value={statement || ''}/>
                <input type='text' placeholder='Option 1' className='p-2' onChange={(e) => setOp1(e.target.value)} value={op1 || ''}/>
                <input type='text' placeholder='Option 2' className='p-2' onChange={(e) => setOp2(e.target.value)} value={op2 || ''}/>
                <input type='text' placeholder='Option 3' className='p-2' onChange={(e) => setOp3(e.target.value)} value={op3 || ''}/>
                <input type='text' placeholder='Option 4' className='p-2' onChange={(e) => setOp4(e.target.value)} value={op4 || ''}/>
                <input type='text' placeholder='Correct Answer' className='p-2' onChange={(e) => setAns(e.target.value)} value={ans || ''}/>
                <button className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-1 font-bold text-white' onClick={setStageTwo}>Next</button>
                </> : 
                <>
                    <h1 className='font-bold text-xl mb-5'>Preview:</h1>
                    <p className='font-semibold text-lg'>Topic: {topic}</p>
                    <p className='font-semibold text-lg'>Total Questions: {totalQuestions}</p>
                    <button className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-1 font-bold text-white mt-5' onClick={addQuiz}>Add Quiz</button>
                </>}
            </>}
        </div>
    </div>
  )
}

export default CreateQuiz