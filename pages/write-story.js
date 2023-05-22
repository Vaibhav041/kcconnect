import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function WriteStory() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState('');
  const currentUser = useSelector(state => state.user.currentUser);
  const router = useRouter();

  const handleClick = async () => {
    let response = await axios.post('https://kccblogserver.onrender.com/blog/add', {
      title:title,
      description:desc,
      img:img,
      category:category,
      userId:currentUser._id
    })
    if (response.status === 200) {
      router.push('/');
    }
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <div className="write bg-white">
        <img
          className="writeImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <form className="writeForm ">
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input id="fileInput" type="file" style={{ display: "none" }} />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button
            className="writeSubmit bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-2 font-semibold rounded-full text-white"
            type="button"
            onClick={handleClick}
          >
            Publish
          </button>
          <div className="writeFormGroup">
            <input
              style={{ fontSize: "20px" }}
              className="writeInput"
              placeholder="Image"
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <input
              style={{ fontSize: "20px" }}
              className="writeInput"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </form>
      </div>
    </>
  );
}
