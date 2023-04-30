import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const BackButton = ({ url }) => {
  return (
    <Link
      to={url}
      className="flex items-center bg-gray-800 text-white w-20 h-[35px] gap-2 px-2"
    >
      <BsArrowLeft size={25} />
      Back
    </Link>
  );
};

export default BackButton;
