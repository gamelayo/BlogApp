import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector(
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
    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mb-16">
      <div className="w-[70%] m-auto">
        <BackButton url="/login" />
      </div>
      <section className="mb-[50px] w-full flex flex-col justify-center items-center  text-base font-bold ">
        <h1 className="flex items-center gap-2">
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit} className="w-[70%] m-auto">
          <div className="form-group">
            <input
              type="text"
              className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
              id="name"
              name="name"
              required
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <input
              type="password"
              className="w-[100%] p-[10px] mb-[10px] rounded border-slate-500 border-solid border"
              id="password2"
              name="password2"
              required
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <button className="py-[10px] w-[100%] px-[20px] bg-black text-white cursor-pointer text-center rounded">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
