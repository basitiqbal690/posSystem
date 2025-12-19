import React from "react";
import { GrOverview } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineInventory2 } from "react-icons/md";
import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const bgColor = darkMode ? "bg-gray-900" : "bg-blue-800";
  const textColor = darkMode ? "text-gray-200" : "text-white";
  const hoverColor = darkMode ? "hover:bg-gray-800" : "hover:bg-blue-900";
  const hrColor = darkMode ? "border-gray-700" : "border-gray-400";

  return (
    <aside
      className={`${bgColor} fixed top-0 left-0 h-screen lg:w-[259px] sm:w-[170px] px-3 lg:px-5 py-8 overflow-y-auto scrollbar-thin`}
    >
      <nav className="h-full flex flex-col">
        <ul className="flex-1 space-y-1">
          {/* Logo */}
          <div className="text-center">
            <h1 className={`font-bold lg:text-lg sm:text-xs ${textColor}`}>
              Admin Panel
            </h1>
            <p
              className={`font-bold mt-1 sm:text-xs lg:text-base ${textColor}`}
            >
              Management Dashboard
            </p>
            <hr className={`mt-8 mb-6 ${hrColor}`} />
          </div>

          {/* Menu Items */}
          <Link
            to="/dashboard/overview"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <GrOverview className="lg:text-xl sm:text-sm" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/dashboard/products"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <AiOutlineProduct className="lg:text-xl sm:text-sm" />
            <span>Products</span>
          </Link>

          <Link
            to="/dashboard/categories"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <MdOutlineCategory className="lg:text-xl sm:text-sm" />
            <span>Categories</span>
          </Link>

          <Link
            to="/dashboard/inventory"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <MdOutlineInventory2 className="lg:text-xl sm:text-sm" />
            <span>Inventory</span>
          </Link>

          <Link
            to="/dashboard/salesReport"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <FaChartLine className="lg:text-xl sm:text-sm" />
            <span>Sales Report</span>
          </Link>

          <Link
            to="/dashboard/pos"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <FaChartLine className="lg:text-xl sm:text-sm" />
            <span>POS</span>
          </Link>

          <Link
            to="/dashboard/profile"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <FaUserCircle className="lg:text-xl sm:text-sm" />
            <span>Profile</span>
          </Link>

          <Link
            to="/dashboard/setting"
            className={`flex items-center gap-4 lg:text-lg sm:text-sm p-3 rounded-md ${textColor} ${hoverColor}`}
          >
            <IoSettingsOutline className="lg:text-xl sm:text-sm" />
            <span>Settings</span>
          </Link>
        </ul>

        {/* Footer */}
        <div className="mt-6">
          <hr className={`mb-4 ${hrColor}`} />
          <Footer />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
