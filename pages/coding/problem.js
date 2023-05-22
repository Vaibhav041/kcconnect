import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { javascript } from "@codemirror/lang-javascript";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";

const CodingProblem = ({ user, problem }) => {
  const [code, setCode] = useState("console.log('hello world')");
  const [output, setOutput] = useState();
  const [show, setShow] = useState(false);
  console.log(problem);

  const runCode = () => {
    setShow(true);
    try {
      const execute = new Function("input1", "input2", "testCases", code);
      // const testCases = [
      //   { input1: 3, input2: 5, expected: 8 },
      //   { input1: -2, input2: 8, expected: 6 },
      //   // Add more test cases as needed
      // ];
      let testCases = [];
      for (let i = 0; i < problem.testcase.length; i++) {
        testCases.push({
          input1: Number(problem.testcase[i][0]),
          input2: Number(problem.testcase[i][2]),
          expected: Number(problem.solutions[i]),
        });
      }

      const results = testCases.map(({ input1, input2, expected }) => {
        const result = execute(input1, input2, testCases);
        const isPassed = result === expected;
        return isPassed;
      });

      setOutput(results);
    } catch (error) {
      setOutput([{ error: error.message }]);
    }
    console.log(output, "output");
  };

  return (
    <div className="bg-[#282c34] h-[91vh] px-5 py-10">
      <div className="flex">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-16 text-slate-50">
            Q. {problem.statement}
          </h1>
          <h1 className="text-xl font-semibold text-slate-50 mb-5">Example 1:</h1>
          <div className="bg-[#363a42] w-2/3 text-lg text-slate-200 rounded-md p-2 mb-5">
            <h1>Input: {problem.testcase[0]}</h1>
            <h1>output: {problem.solutions[0]}</h1>
          </div>
          <h1 className="text-xl font-semibold text-slate-50 mb-5">Example 2:</h1>
          <div className="bg-[#363a42] w-2/3 text-lg text-slate-200 rounded-md p-2">
            <h1>Input: {problem.testcase[1]}</h1>
            <h1>output: {problem.solutions[1]}</h1>
          </div>
        </div>
        <div className="flex-1">
          <CodeMirror
            value={code}
            width="90%"
            height="480px"
            theme={okaidia}
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => setCode(value)}
          />
          {!show ? <button
            className="bg-green-500 rounded-sm text-white font-bold px-5 py-1 mt-5"
            onClick={runCode}
          >
            Submit Code
          </button> : 
          <div className="bg-[#363a42] w-[90%] mt-5 relative p-5 overflow-y-auto">
            {
              output.map((ans, index) => {
                // return <div className="w-1/2 flex justify-between bg-[#5a5e67] m-1 rounded-md px-2">
                //   <div className="text-white font-medium">TestCase{index+1}</div>
                //   <div>{output[index] ? <CheckCircleIcon style={{color:"lightgreen"}}/> : <CancelIcon style={{color:"red"}}/>}</div>
                // </div>
                return <div className="inline bg-[#5a5e67] px-2 py-1 mx-1 rounded-full text-gray-50" key={index}> 
                TestCase{index+1}
                <span className="ml-2">{output[index] ? <CheckCircleIcon style={{color:"lightgreen"}}/> : <CancelIcon style={{color:"red"}}/>}</span>
                </div>
              })
            }
            <span onClick={() => setShow(false)} className="absolute top-0 right-1 cursor-pointer"><CancelIcon style={{color:"white"}}/></span>
          </div>}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const userId = context.query.userId;
  const problemId = context.query.problemId;
  let user = await axios.get(`https://kccblogserver.onrender.com/user/get/${userId}`);
  let problem = await axios.get(
    `https://kccblogserver.onrender.com/problem/get/${problemId}`
  );
  return {
    props: { user: user.data, problem: problem.data }, // will be passed to the page component as props
  };
}

export default CodingProblem;
