import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getPost, deletePost } from "../features/post/postSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
const Post = () => {
  const { post, isLoading, isError, message } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.auth);

  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getPost(postId));
  }, [isError, message, postId, dispatch]);
  console.log(post);
  console.log(user);
  const closePost = () => {
    dispatch(deletePost(postId));
    navigate("/");
  };

  const locales = "en-US"; // use US locale
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }; // customize the formatting

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-8 md:mx-20 mb-12">
      <div>
        <BackButton url="/" />
      </div>
      <div className="my-2">
        <h1 className="text-center text-2xl font-bold">{post.title}</h1>
        <p className="my-2 flex gap-3 justify-center">
          <span className="text-sm">By: {post.userName}</span>
          <span className="text-sm">
            {new Date(post.createdAt).toLocaleString(locales, options)}
          </span>
        </p>
      </div>

      <div className="my-4">
        {user?._id === post.user ? (
          <div className="flex justify-center gap-6">
            <button
              onClick={closePost}
              className="px-4 py-2 bg-red-300 rounded-md"
            >
              Delete
            </button>
            <Link to={`/update-post/${post._id}`}>
              <button className="px-4 py-2 bg-cyan-400 rounded-md">
                Update
              </button>
            </Link>
          </div>
        ) : null}
      </div>

      <div className="h-[250px] md:h-[500px]">
        <img
          src={`/${post.imageData}`}
          alt={post.imageName}
          className="w-full h-[100%] object-contain"
        />
      </div>
      <div
        className="my-4 text-justify"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default Post;
