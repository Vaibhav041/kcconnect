import Link from "next/link";
import React, { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TerminalIcon from "@mui/icons-material/Terminal";
import QuizIcon from "@mui/icons-material/Quiz";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../utils/redux/userSlice";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const blogPath = router.pathname === "/blogpage";
  const quizPath = router.pathname === "/quiz";
  const codingPath = router.pathname === "/coding";

  const deleteBlog = async () => {
    let result = await axios.delete(
      `https://kccblogserver.onrender.com/blog/delete/${router.query.blogId}`
    );
    if (result.status === 200) {
      router.push("/");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center h-[9vh] bg-[#282c34] shadow-lg">
        <div
          className="md:pl-10 pl-5 font-bold text-2xl cursor-pointer text-blue-700"
          onClick={() => router.push("/")}
        >
          KC<span className="text-white">Connect</span>
        </div>
        <div className="md:pr-10 pr-5 flex gap-10 items-center text-white">
          {/* {currentUser.isTeacher === true && <Link className="hover:text-blue-700" href='/dashboard'><DashboardIcon/> Dashboard</Link>} */}
          <Link className="hover:text-blue-700" href="/quiz">
            <QuizIcon /> Quiz
          </Link>
          <Link className="hover:text-blue-700" href="/coding">
            <TerminalIcon /> Coding Challenges
          </Link>
          <Link
            className="hover:text-blue-700"
            href={currentUser ? "/write-story" : "write"}
          >
            <EditNoteIcon />
            Write
          </Link>
          {currentUser?.isTeacher && quizPath && (
            <button onClick={() => router.push('/create-quiz')} className="bg-yellow-700 text-white rounded-full px-5 py-2 hover:bg-yellow-800">
              Create Quiz
            </button>
          )}
          {currentUser?.isTeacher && codingPath && (
            <button onClick={() => router.push('/create-challenge')} className="bg-yellow-700 text-white rounded-full px-5 py-2 hover:bg-yellow-800">
              Create Challenge
            </button>
          )}
          {currentUser ? (
            <button
              onClick={() => dispatch(updateUser(""))}
              className="bg-blue-700 text-white rounded-full px-5 py-2 hover:bg-blue-800"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="bg-blue-700 text-white rounded-full px-5 py-2 hover:bg-blue-800"
            >
              SignUp
            </button>
          )}
          {blogPath && currentUser?.isTeacher === true && (
            <button
              className="bg-red-500 px-5 py-2 font-bold text-white rounded-full"
              onClick={deleteBlog}
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Navbar;
