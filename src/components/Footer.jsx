import React from "react";
import { PiCopyright } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="text-center text-gray-400">
      <footer className="flex justify-center items-center gap-1 mt-10">
        <PiCopyright className="text-2xl" />
        <p className="text-lg font-semibold">2025 POS System</p>
      </footer>

      <p className="text-lg font-semibold mt-1 mb-10">Version 1.0.0</p>
    </div>
  );
};

export default Footer;
