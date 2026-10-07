// import { neon } from '@netlify/neon';
import { useEffect } from 'react';

function Test() {

  //  const postId = 1;
  //   const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const [post] = [ sql`SELECT * FROM posts WHERE id = ${postId}`];
  
  useEffect(() => {
  fetch("http://localhost:5000/test")
    .then(res => res.json())
    .then(data => console.log("From backend:", data))
    .catch(err => console.error(err));
}, []);
const sendPost = async () => {
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Hello",
      content: "This is my first post",
    }),
  });

  const data = await response.json();
  console.log(data);
};





  return (
    <>
      <div className="fixed bottom-5 border-b  left-10 flex gap-2">
        {/* <button onClick={() => setIsOpen(true)}>Open </button> */}
        <button onClick={sendPost}>send post</button>
        {/* <div className="">{sizeW} x {sizeH}</div> */}
      </div>
    </>
  );
}

export default Test;


