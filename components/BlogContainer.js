import React from "react";
import BlogCard from "./BlogCard";
import { categories } from "@/utils/data";
import { useRouter } from "next/router";

const BlogContainer = ({blogs}) => {
  const router = useRouter();
  console.log(blogs)
  return (
    <div className="flex mt-10">
      <div className="flex-[2]">
        <div className="flex flex-col mx-8">
          {blogs.map((item, index) => {
            return (
              <div className="my-1" key={index}>
                <BlogCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-1 pl-10">
        <h1 className="font-semibold text-2xl">
          Discover more of what matters to you
        </h1>
        <div className="flex flex-wrap gap-2 mt-5 mb-5">
          {categories.map((ele, index) => {
            return (
              <span
              key={index}
                className="text-gray-500 bg-gray-300 rounded-full p-2 shadow-md cursor-pointer"
                onClick={() =>
                  router.push({ pathname: "/tag", query: { tag: ele } })
                }
              >
                {ele}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default BlogContainer;
