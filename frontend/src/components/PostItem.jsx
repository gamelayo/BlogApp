import React from "react";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  const locales = "en-US"; // use US locale
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }; // customize the formatting

  return (
    <Link to={`/post/${post._id}`}>
      <div className="my-10 mx-10 flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-[40%]">
          <img
            src={`/${post.imageData}`}
            alt={post.imageName}
            className="w-full h-[100%]"
          />
        </div>
        <div className="w-full md:w-[55%] m-auto">
          <h1 className="text-xl font-semibold my-2 md:my-2 text-start">
            {post.title}
          </h1>
          <div className="flex gap-3">
            <p className="text-sm text-start">By: {post.userName}</p>
            <p className="text-sm text-start">
              {new Date(post.createdAt).toLocaleString(locales, options)}
            </p>
          </div>

          <p className=" my-2 text-justify">{post.summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
