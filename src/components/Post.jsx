import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faHeart,faComment, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./Post.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [success, setSuccess] = useState("");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchResponse = await fetch("http://localhost:8000/posts");
        const result = await fetchResponse.json();
        setPosts(result);
      } catch (err) {
        console.error("Error while fetching posts", err);
      }
    };
    fetchPosts();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const allPosts = await axios.get("http://localhost:8000/posts");
      const posts = allPosts.data;
      const userDetails =JSON.parse(localStorage.getItem('loggedInUser'));
      const highestId =
        posts.length > 0 ? Math.max(...posts.map((post) => post.id)) : 0;
      const newId = highestId + 1;
      const newPostData = {
        id: newId,
        post: newPost,
        userDetails: userDetails,
        userName: userDetails.fullname,
        postedDate : formattedDate
      };
      const response = await axios.post(
        "http://localhost:8000/posts",
        newPostData
      );
      setPosts([...posts, response.data]);
      setSuccess("Posted Successfully!!!");
      setNewPost("");
    } catch (error) {
      console.error("An error occurred while posting a message", error);
    }
  };

  return (
    <div>
      <div>
        {posts.map((item) => (
          <div key={item.id}>
            <div className="displayPost" readOnly>
              <div className="postTop"><FontAwesomeIcon icon={faUser} className="userIcon"  /><p>{item.userName}</p></div>
            
              {item.post}
              <div className="postBottom">
                <div className="reactions">
              <FontAwesomeIcon  icon={faHeart} style={{ color: "#f6138c",margin:"10px" }} />
              <FontAwesomeIcon icon={faComment} style={{ margin: "10px" }}/>
              <FontAwesomeIcon icon={faShare} style={{ margin: "10px" }} />
              </div>
              <p className="postedOn">Posted on : {item.postedDate} </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
  <div className="inputContainer">
    <input
      className="postBox"
      type="text"
      placeholder="Start Typing..."
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      required
    />
    <button className="sendButton" type="submit">
      <FontAwesomeIcon className="icon" style={{ color: "rgb(10, 167, 229)"}} icon={faPaperPlane} />
    </button>
  </div>
  {success && <p style={{ color: "rgb(75, 233, 75)" }}>{success}</p>}
</form>

    </div>
  );
};

export default Post;