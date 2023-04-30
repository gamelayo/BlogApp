import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/post/postSlice";
import Spinner from "./Spinner";
import PostItem from "./PostItem";
const Posts = () => {
  const { posts, isLoading, isSuccess } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
