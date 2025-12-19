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

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`
        fixed top-0 right-0
        sm:left-[170px]
        lg:left-[250px]
        h-[70px]
        z-50
        shadow-md


        ${darkMode ? "bg-gray-900" : "bg-white"}
      `}
    >
      <nav className="h-full flex items-center justify-between px-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          <FcHome className="text-3xl" />

          <div>
            <h1
              className={`font-bold lg:text-xl sm:text-sm ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Point of Sales
            </h1>

            <div className="flex items-center gap-1">
              <RiHomeLine
                className={`lg:text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              />
              <span
                className={`lg:text-lg sm:text-xs ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Admin Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full shadow transition hover:scale-110 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            {darkMode ? (
              <MdLightMode className="text-xl text-yellow-300" />
            ) : (
              <MdDarkMode className="text-xl" />
            )}
          </button>

          {/* CLOCK */}
          <div className="hidden lg:flex items-center">
            <Clock
              value={value}
              size={32}
              className={darkMode ? "text-white" : ""}
            />
            <span
              className={`ml-2 text-sm ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {value.toLocaleTimeString()}
            </span>
          </div>

          {/* USER INFO */}
          <div
            className={`flex items-center gap-2 p-2 rounded ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <div className="hidden sm:block text-xs leading-tight">
              <span>Administrator</span>
              <br />
              <span className="font-bold">Admin User</span>
            </div>

            <img
              src="/profile-img.jpg"
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>

          {/* LOGOUT */}
          <Link
            to="../pages/LoginPage.jsx"
            className={`flex items-center gap-1 font-bold transition ${
              darkMode
                ? "text-gray-200 hover:text-gray-300"
                : "text-black hover:text-gray-600"
            }`}
          >
            <LuLogOut className="text-xl hidden md:block" />
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
