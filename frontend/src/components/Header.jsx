import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const handleNav = () => {
    setMenu(!menu);
  };
  const closeNav = () => {
    setMenu(false);
  };
  return (
    <header className=" relative z-50">
      <nav className="flex justify-between fixed w-full top-0 left-0 h-20 p-6 items-center rounded shadow-xl border  mx-auto bg-cyan-100 px-2 text-slate-700 ">
        <NavLink to="/" onClick={closeNav}>
          <h1 className="font-bold">Blog App</h1>
        </NavLink>
        <ul className="hidden md:flex gap-4">
          <NavLink to="/new-post">
            <li className="font-semibold hover:text-cyan-400">Add Post</li>
          </NavLink>
          {user ? (
            <button
              onClick={onLogout}
              className="font-semibold hover:text-cyan-400"
            >
              Log Out ({user?.name})
            </button>
          ) : (
            <NavLink to="/login">
              <li className="font-semibold hover:text-cyan-400">Sign Up</li>
            </NavLink>
          )}
        </ul>
        <div className="block md:hidden cursor-pointer z-10">
          {menu ? (
            <FaTimes size={25} onClick={handleNav} />
          ) : (
            <FaBars size={25} onClick={handleNav} />
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={
          menu
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full  bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20  flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full py-8 px-4 text-center bg-white rounded-2xl shadow-xl border mx-auto">
          <NavLink to="/new-post" onClick={closeNav}>
            <li className="border-b py-2">Add Post</li>
          </NavLink>
          {user ? (
            <button onClick={onLogout} className="font-semibold">
              Log out
            </button>
          ) : (
            <NavLink to="/login" onClick={closeNav}>
              <li className="border-b py-2 font-semibold">Sign Up</li>
            </NavLink>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
