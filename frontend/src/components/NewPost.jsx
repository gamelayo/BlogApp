import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { createPost, reset } from "../features/post/postSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [name] = useState(user?.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message]);
  const onSubmit = (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append("image", image);
    postData.append("title", title);
    postData.append("name", name);
    postData.append("summary", summary);
    postData.append("content", content);
    dispatch(createPost(postData));
    navigate("/");
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mb-12">
      <form
        onSubmit={onSubmit}
        encType="multipart/form-data"
        className="w-[70%] m-auto"
      >
        <div className="mb-[10px]">
          <input
            type="text"
            placeholder="Title"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-[10px]">
          <input
            type="text"
            placeholder="Summary"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div className="mb-[10px]">
          <input
            type="file"
            className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
        <div className="mb-[10px]">
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
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
