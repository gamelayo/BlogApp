import axios from "axios";

const API_URL = "http://localhost:5000/api/posts/";

// Create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);

  return response.data;
};
// Get Posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Get user Post
const getPost = async (postId) => {
  const response = await axios.get(API_URL + postId);

  return response.data;
};
// update user post
const updatePost = async (postId, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + postId, postData, config);

  return response.data;
};

// Delete user transaction
const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + postId, config);

  return response.data;
};

const postService = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};

export default postService;
