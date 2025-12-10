import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { FcHome } from "react-icons/fc";
import { RiHomeLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-[250px] w-[calc(100%-250px)] bg-white shadow-md z-50">
      <nav className="flex items-center justify-between pl-4 pr-4 py-3">
        {/* LEFT SECTION */}
        <div className="flex items-center">
          <FcHome className="text-4xl mr-3 ml-2" />
          <div>
            <h1 className="text-xl font-bold">Point of Sales</h1>
            <div className="flex items-center">
              <RiHomeLine className="text-xl mr-2" />
              <span className="text-xl">Admin Dashboard</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-6">
          {/* CLOCK BOX */}
          <div className="flex bg-white p-3 rounded shadow-sm items-center">
            <Clock value={value} size={35} />
            <p className="ml-3 text-lg">{value.toLocaleTimeString()}</p>
          </div>

          {/* USER INFO */}
          <div className="flex items-center bg-white p-2 rounded shadow-sm">
            <div className="mr-3">
              <span className="text-gray-600">Administrator</span>
              <br />
              <span className="font-bold">Admin User</span>
            </div>

            <img
              src="/profile-img.jpg"
              className="h-[50px] w-[50px] rounded-full"
              alt="profile"
            />
          </div>

          {/* LOGOUT */}
          <div className="flex items-center cursor-pointer">
            <LuLogOut className="mr-2 text-2xl" />
            <Link to="../pages/LoginPage.jsx" className="text-xl font-bold">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
