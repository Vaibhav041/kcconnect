import { Inter } from "next/font/google";
import Homie from "@/components/Home";
import BlogContainer from "@/components/BlogContainer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({blogs}) {
  return (
    <>
      <Homie/>
      <BlogContainer blogs={blogs}/>
    </>
  )
}

export async function getServerSideProps(context) {
  let response = await axios.get('https://kccblogserver.onrender.com/blog/getAll');
  return {
    props: {blogs:response.data}, // will be passed to the page component as props
  };
}