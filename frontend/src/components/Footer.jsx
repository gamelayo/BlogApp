import React from "react";
const date = new Date();
const year = date.getFullYear();
const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-1 w-full bg-cyan-100 py-4 rounded shadow-xl border">
      <div>
        <div className="text-slate-700 ">Code By: Gamel Ayodele</div>
        <div className="text-slate-700">&copy; {year} All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
