import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router";

const Blog = ({ blog, Author }) => {
  const [comment, setComment] = useState('');
  const [Comments, setComments] = useState([]);
  const currentUser = useSelector(state => state.user.currentUser);
  const router = useRouter();

  useEffect(() => {
    const getComments = async() => {
      let comments = await axios.get(`https://kccblogserver.onrender.com/comment/get/${router.query.blogId}`)
      setComments(comments.data);
    }
    getComments();
  })

  const addComment = async() => {
    let res = await axios.post('https://kccblogserver.onrender.com/comment/add', {
      userId:currentUser.email,
      blogId:blog._id,
      desc:comment
    })
    setComment('');
    console.log(res.data)
  }

  return (
    <div className="py-10 px-72 bg-white">
      <div className="mb-5 flex justify-center">
        <img className="h-60 w-96" src={blog.img} />
        {/* <div className='text-md font-medium'>
                <p>Published: {blog.date}</p>
                <p>Author: {Author.name}</p>
            </div> */}
      </div>
      <div className="flex justify-center">
        <div className="mb-10">
          <h1 className="font-bold text-3xl">{blog.title}</h1>
          <p className="text-gray-500">
            By <span className="underline font-medium">{Author}</span> ·{" "}
            {blog.date} · 10 min read
          </p>
        </div>
      </div>
      <p className="font-medium font-serif">
        {blog.description} Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Voluptatem amet ut corrupti nobis animi ea aperiam eveniet,
        quaerat recusandae deleniti praesentium quidem doloribus? Similique,
        fugit dolorem veritatis eius quam nam itaque vitae expedita corrupti
        facilis magni provident harum ipsa tempora aut. Maiores, asperiores.
        Modi consectetur harum doloremque exercitationem sunt suscipit, facilis,
        debitis ipsam accusamus at maxime. Incidunt reprehenderit tenetur magnam
        quis molestiae blanditiis nulla quia velit. Suscipit doloremque
        aspernatur quo quisquam maxime illum tenetur ad vero adipisci aliquam
        facere vel facilis ratione architecto sint nemo iste est id eaque,
        doloribus alias perferendis! Praesentium, odit ratione! Perferendis rem,
        maiores dicta commodi beatae ullam, repellendus, optio impedit ipsum
        omnis cupiditate. Repellendus nobis voluptates alias atque esse a, eaque
        amet id harum architecto hic voluptate vel iste unde magnam
        exercitationem deserunt provident aspernatur! Modi, quas maiores.
        Placeat omnis quaerat iure fugiat? Aperiam corporis error ducimus porro
        culpa similique fugit nulla delectus fuga, officiis labore commodi sed
        vitae ipsa sequi molestiae? Odio eius cumque dolorem repellendus tempore
        temporibus veniam similique, itaque optio quisquam ut enim ex soluta
        totam nam rerum voluptatibus inventore dolorum? Deserunt, animi
        praesentium ullam laboriosam tempore non numquam, earum fuga beatae
        voluptas alias suscipit? Adipisci maiores ex, maxime corrupti saepe
        possimus architecto tempore ipsa sunt perspiciatis quia alias quae sint
        cupiditate, impedit laboriosam, soluta quo. Accusamus voluptates
        corporis alias doloremque. Fuga consequatur sapiente, cum accusantium
        eveniet iure dicta officia ut corrupti, id aut, perferendis sunt culpa
        deserunt doloribus numquam. Et temporibus adipisci repudiandae facilis.
        Vitae eius, harum voluptates culpa molestiae ad officiis ullam in
        quaerat, laudantium iure! Vel voluptatum ipsum sequi? Dolorum alias,
        deserunt adipisci sunt numquam debitis quasi consectetur commodi vero
        blanditiis laboriosam est dolores, tenetur eos molestias eum aut nulla
        quam recusandae excepturi. At suscipit omnis, laboriosam incidunt modi
        in, dolorem numquam laborum quia minima nobis ex ullam. Ipsa.
      </p>
      <p className="font-medium font-serif mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, dolorum.
        Magnam odio fugiat necessitatibus vel nesciunt tenetur, velit facere
        doloremque, hic, cupiditate repellendus sit quibusdam dolores omnis
        minima earum iste quaerat repudiandae quod. Ad, atque in? Modi deleniti
        beatae qui unde inventore natus ut totam, molestiae non repellat
        asperiores blanditiis molestias, aliquam eaque quasi deserunt animi cum
        facere, laborum error sint nulla quaerat. Quasi distinctio non odio
        voluptas, commodi porro eius repudiandae pariatur debitis culpa quas
        illo omnis cum eveniet quaerat inventore dignissimos totam doloribus,
        ipsum, tempore necessitatibus quis? Ipsa voluptatibus quasi sequi. Odio
        hic, alias asperiores officiis voluptatum error, quis facere vel, iure
        accusamus minima nisi harum doloribus voluptatem explicabo inventore
        dolorem. Earum ad itaque explicabo voluptatum dicta facere
        necessitatibus hic doloribus impedit neque, nesciunt, exercitationem
        delectus atque vitae voluptas fuga eligendi deleniti. Exercitationem
        minima mollitia distinctio doloremque! Exercitationem repudiandae
        molestias quia laboriosam. Officiis pariatur reiciendis obcaecati enim
        magnam consequatur dolorem, excepturi cupiditate doloremque alias
        nostrum in minima? Reprehenderit corrupti, adipisci rerum, provident
        modi culpa animi incidunt, voluptas vitae rem doloremque distinctio.
        Optio aperiam a accusamus tenetur maiores in ut dicta reiciendis, esse
        veniam perferendis veritatis. Consectetur autem in incidunt, labore
        architecto, veniam doloremque aperiam cum iste totam temporibus?
      </p>
      <div className="mt-10">
          <input type='text' placeholder="Add comment..." className="focus:outline-none flex-[1] text-xl w-full" onChange={e => setComment(e.target.value)} value={comment}/>
        <hr className="border border-solid border-black"/>
        <div className="text-right mt-1"><button onClick={addComment} className="bg-black text-white rounded-full p-2 disabled:opacity-75 disabled:cursor-not-allowed" disabled={!comment}>Comment</button></div>

        <div className="mt-10">
          {
            Comments?.slice(0).reverse().map((item, index) => {
              return <div className="flex items-center my-8" key={index}>
                <div><AccountCircleIcon style={{fontSize:"45px"}}/></div>
                <div>
                  <p className="text-xs text-gray-500">@{item.userId}</p>
                  <p className="text-lg font-medium">{item.desc}</p>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  let response = await axios.get(
    `https://kccblogserver.onrender.com/blog/get/${context.query.blogId}`
  );
  let Author = await axios.get(
    `https://kccblogserver.onrender.com/user/get/${response.data.userId}`
  );
  return {
    props: { blog: response.data, Author: Author.data }, // will be passed to the page component as props
  };
}

export default Blog;
