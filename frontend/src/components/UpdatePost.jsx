import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updatePost } from "../features/post/postSlice";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const UpdatePost = () => {
  const { user } = useSelector((state) => state.auth);
  const { post, isError, isLoading, message } = useSelector(
    (state) => state.post
  );
  const [name] = useState(user.name);
  const [title, setTitle] = useState(post?.title || " ");
  const [summary, setSummary] = useState(post?.summary || "");
  const [content, setContent] = useState(post?.content || "");

  const [image, setImage] = useState(null);

  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message, post]);
  const onSubmit = (e) => {
    e.preventDefault();
    const postData = new FormData();
    if (image !== null) {
      postData.append("image", image);
    }
    postData.append("title", title);
    postData.append("name", name);
    postData.append("summary", summary);
    postData.append("content", content);
    dispatch(updatePost({ postId, postData }));
    navigate("/");
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mb-12">
      <div className="w-[70%] m-auto mb-[20px]">
        <BackButton url={`/post/${postId}`} />
      </div>
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="w-[70%] m-auto"
      >
        <div className="mb-[10px] flex flex-col gap-1">
          <label className="font-semibold">Edit title</label>
          <input
            type="text"
            placeholder="title"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-[10px] flex flex-col gap-1">
          <label className="font-semibold">Edit text</label>
          <input
            type="text"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            placeholder="summary"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div className="mb-[10px] flex flex-col gap-1">
          <label className="font-semibold">
            Please replace the image or input the same image
          </label>
          <input
            type="file"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>

        <div className="mb-[10px] flex flex-col gap-1">
          <label className="font-semibold">Edit Content</label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
            className="w-[100%] p-[2px] mb-[10px] rounded border-slate-500 border-solid border z-10"
          />
        </div>
        <div className="mb-[10px] flex justify-center">
          <button
            type="submit"
            className="py-[10px] w-[100%] px-[20px] bg-black text-white cursor-pointer text-center rounded"
          >
            Edit Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
