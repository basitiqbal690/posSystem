import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { FcHome } from "react-icons/fc";
import { RiHomeLine } from "react-icons/ri";
import { LuLogOut } from "react-icons/lu";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/slice/ThemeSlice";

const Navbar = () => {
  const [value, setValue] = useState(new Date());
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`fixed top-0 left-[250px] w-[calc(100%-250px)] shadow-md z-50  ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <nav className="flex items-center justify-between pl-4 pr-4 py-3">
        {/* LEFT SECTION */}
        <div className="flex items-center">
          <FcHome className="text-4xl mr-3 ml-2" />
          <div>
            <h1
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Point of Sales
            </h1>
            <div className="flex items-center">
              <RiHomeLine
                className={`text-xl mr-2  ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              />
              <span
                className={`text-xl  ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-6">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full shadow hover:scale-110 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {darkMode ? (
              <MdLightMode className="text-2xl text-yellow-300" />
            ) : (
              <MdDarkMode className="text-2xl" />
            )}
          </button>

          {/* CLOCK BOX */}
          <div
            className={`flex p-3 rounded shadow-sm items-center  ${
              darkMode ? "bg-none text-white" : "bg-white text-black"
            }`}
          >
            <Clock
              value={value}
              size={35}
              className={` ${darkMode ? "text-white" : "bg-white"}`}
            />

            <p
              className={`ml-3 text-lg ${
                darkMode ? "text-white" : "bg-white"
              } `}
            >
              {value.toLocaleTimeString()}
            </p>
          </div>

          {/* USER INFO */}
          <div
            className={`flex items-center p-2 rounded shadow-sm ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <div className="mr-3">
              <span className={``}>Administrator</span>
              <br />
              <span className="font-bold ">Admin User</span>
            </div>

            <img
              src="/profile-img.jpg"
              className="h-[50px] w-[50px] rounded-full"
              alt="profile"
            />
          </div>

          {/* LOGOUT */}
          <div className="flex items-center cursor-pointer ">
            <LuLogOut
              className={`mr-2 text-2xl ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            />
            <Link
              to="../pages/LoginPage.jsx"
              className={`text-xl font-bold ${
                darkMode ? "text-gray-200" : "text-black"
              }`}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
