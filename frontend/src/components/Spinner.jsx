import React from "react";
import spinner from "../assets/spinner.gif";
const Spinner = () => {
  return (
    <div className="w-full flex justify-center">
      <img src={spinner} alt="loading..." />
    </div>
  );
};

export default Spinner;
