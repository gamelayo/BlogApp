const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleWare/authMiddleWare");
const upload = require("../middleWare/uploadMiddleWare");
const updateUpload = require("../middleWare/updateUploadMiddleWare");
router
  .route("/")
  .post(upload.single("image"), protect, createPost)
  .get(getPosts);

router
  .route("/:id")
  .get(getPost)
  .put(updateUpload.single("image"), protect, updatePost)
  .delete(protect, deletePost);

module.exports = router;
