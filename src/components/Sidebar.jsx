import React from "react";
import { GrOverview } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineInventory2 } from "react-icons/md";
import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import { useSelector} from "react-redux";
import { FcSalesPerformance } from "react-icons/fc";

const Sidebar = () => {
  const { pathname } = useLocation();
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Colors based on darkMode
  const bgColor = darkMode ? "bg-gray-900 text-gray-400" : " bg-linear-to-b from-blue-900 via-blue-800 to-blue-700";
  const textColor = darkMode ? "text-gray-200" : "bg-blue-700 font-bold text-white shadow-lg";
  const hoverColor = darkMode ? "hover:bg-gray-800 hover:scale-105" : "text-gray-200 hover:bg-blue-600 hover:text-white hover:scale-105";
  const hrColor = darkMode ? "border-gray-700" : "border-gray-500";

  const navItems = [
    { label: "Dashboard", icon: <GrOverview className="sm:text-base text-2xl" />, path: "/dashboard/overview" },
    { label: "Products", icon: <AiOutlineProduct className="sm:text-base text-2xl" />, path: "/dashboard/products" },
    { label: "Categories", icon: <MdOutlineCategory className="sm:text-base text-2xl" />, path: "/dashboard/categories" },
    { label: "Inventory", icon: <MdOutlineInventory2 className="sm:text-base text-2xl" />, path: "/dashboard/inventory" },
    { label: "Sales Report", icon: <FaChartLine className="sm:text-base text-2xl " />, path: "/dashboard/salesReport" },
    { label: "POS", icon: <FaChartLine className="sm:text-base text-2xl text-white" />, path: "/dashboard/pos" },
    { label: "Profile", icon: <FaUserCircle className="sm:text-base text-2xl" />, path: "/dashboard/profile" },
    { label: "Settings", icon: <IoSettingsOutline className="sm:text-base text-2xl" />, path: "/dashboard/setting" },
  ];


  return (
    <aside
      className={`
        fixed top-0 left-0
        h-full 
        w-[256px]
        sm:w-[170px]
        md:w-[200px]
        lg:w-[256px]
        px-3 py-8 
        shadow-2xl 
        z-40
        overflow-y-auto hover:overflow-y-scroll
        scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-blue-800
      ${bgColor}`}
    >
      <nav className="h-full flex flex-col">
          <div>
            <h1
              className={`font-extrabold sm:text-base text-2xl text-center text-white tracking-wider mb-1`}
            >
              Admin Panel
            </h1>
            <p
              className={`font-bold text-center sm:text-xs text-gray-300 text-sm mb-6`}
            >
              Management Dashboard
            </p>
            <hr className={`mt-8 mb-6 border-gray-500`} />
          </div>
          {/* Navigation Items */}
          <ul className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-4 
                  text-base sm:text-sm md:text-base lg:text-xl
                  p-3 sm:p-4 rounded-lg
                  duration-300 ease-in-out
                  cursor-pointer
                  ${
                    pathname === item.path
                      ? `${textColor}`
                      : `${hoverColor}`
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </ul>

        {/* Footer stays at bottom but scrolls when needed */}
        <div className="pt-6 mt-auto">
          <hr className={`mb-4 ${hrColor}`} />
          <Footer />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
