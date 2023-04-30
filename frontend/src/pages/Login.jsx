import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mb-16">
      <section className="mb-[50px] w-full flex flex-col justify-center items-center  text-base font-bold">
        <h1 className="flex items-center gap-2">
          <FaSignInAlt size={30} /> Login
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit} className="w-[70%] m-auto">
          <div className="mb-[10px]">
            <input
              type="email"
              className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
              id="email"
              name="email"
              required
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-[10px]">
            <input
              type="password"
              className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
              id="password"
              name="password"
              required
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-[10px] flex items-center justify-center">
            <button
              className="py-[10px] w-[100%] px-[20px] bg-black text-white cursor-pointer text-center rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className="flex flex-col justify-center items-center mt-8 font-semibold gap-2">
        <h3>Do not have an account?</h3>
        <Link to="/register" className="flex items-center gap-2">
          <FaUser size={25} /> Register
        </Link>
      </section>
    </div>
  );
};

export default Login;
