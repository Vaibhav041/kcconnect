import React, { useState } from "react";
import axios from "axios";
import Animation from "../../lottie.json";
import Lottie from "lottie-react";

const Quiz = ({ quiz }) => {
  const [ques, setQues] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [ind, setIndex] = useState(-1);

  const handleSelect = (choice, index) => {
    setSelected(choice);
    setIndex(index);
  };
  const handleNext = () => {
    if (selected === quiz.questions[ques].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setQues((prev) => prev + 1);
    setSelected("");
    setIndex(-1);
  };
  const handleSubmit = () => {
    if (selected === quiz.questions[ques].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSubmitted(true);
    setSelected("");
  };

  return (
    <div
      className="flex justify-center items-center h-[91vh] w-full bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover"
      style={{ backgroundImage: "url('/bg5.png')" }}
    >
      <div className=" w-[30%] text-black p-10 rounded-xl bg-gray-100">
        {submitted ? (
          <div className="flex flex-col items-center text-blue-900">
            <h1 className="text-2xl mb-4">Your Score:</h1>
            <h2 className="text-3xl">{score}</h2>
            <div className="w-52">
              <Lottie animationData={Animation} loop={true} />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-medium text-blue-900 mb-1">
              0{ques + 1}.
            </h1>
            <p className="text-lg font-serif">
              {quiz.questions[ques].question}
            </p>
            <div className="mt-5">
              {quiz.questions[ques].choices.map((choice, index) => {
                let select = (ind == index) ? "selectedAnswer" : null;
                console.log(select, "select")
                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(choice, index)}
                    className={`cursor-pointer list-none bg-white font-semibold text-black my-2 rounded-md p-2 ${select}`}
                  >
                    {choice}
                  </li>
                );
              })}
            </div>
            {ques + 1 !== quiz.totalQuestions ? (
              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 py-2 mt-5 rounded-full px-10 text-white font-semibold"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 py-2 mt-5 rounded-full px-10 text-white font-semibold"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let response = await axios.get(
    `https://kccblogserver.onrender.com/quiz/get/${context.query.quizId}`
  );
  return {
    props: { quiz: response.data }, // will be passed to the page component as props
  };
}

export default Quiz;
