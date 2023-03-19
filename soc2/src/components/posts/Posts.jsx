import React from "react";
import { makerequest } from "../../axios";
import Post from "../post/Post";
import { useQuery } from "react-query";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makerequest.get("/posts/getPosts/" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "il y a une erreur"
        : isLoading
        ? "loading"
        : data.map((post) => <Post userPost={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
