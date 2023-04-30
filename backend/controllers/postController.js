const asyncHandler = require("express-async-handler");
const fs = require("fs");
const User = require("../models/userModel");
const Post = require("../models/postModel");

// @desc create new post
// @route POST /api/posts
// @access private
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    imageName: req.file.filename,
    imageData: req.file.path,
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    userName: req.body.name,
    user: req.user._id,
  });

  // Get user using the id and the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const result = await post.save();

  res.status(200).json({
    success: true,
    message: "Post created successfully",
    post: result,
  });
});

// @desc get Posts
// @route GET /api/posts
// @access public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    throw new Error("post not found");
  }
  res.json(posts);
});

// @desc get Post
// @route GET /api/posts/:id
// @access public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new Error("post not found");
  }
  res.status(200).json(post);
});

// @desc Update post
// @route PUT /api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;
  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if logged-in user is the owner of the post
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this post");
  }

  // Delete the old image
  fs.unlink(post.imageData, (err) => {
    if (err) throw err;
    console.log("Old image deleted successfully");
  });

  // Update post fields and new image path
  post.title = title || post.title;
  post.summary = summary || post.summary;
  post.content = content || post.content;
  post.imageName = req.file.filename;
  post.imageData = req.file.path;

  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    post: updatedPost,
  });
});

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Check if logged-in user is the owner of the post
  if (post.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this post");
  }

  // Delete the image
  fs.unlink(post.imageData, (err) => {
    if (err) throw err;
    console.log("Image deleted successfully");
  });

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
