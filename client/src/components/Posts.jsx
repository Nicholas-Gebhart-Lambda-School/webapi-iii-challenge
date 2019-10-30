import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetch from "../services/fetchPosts";

const Post = ({ posted, text }) => {
  return (
    <>
      <h3>{posted}</h3>
      <p>{text}</p>
    </>
  );
};

export default props => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(props.match.params.id).then(res => setPosts(res.data));
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        textDecoration: "none",
        fontFamily: "sans-serif"
      }}
    >
      <Link to="/">Back to Authors</Link>
      {posts.map(post => {
        return <Post posted={post.postedBy} text={post.text} />;
      })}
    </div>
  );
};
