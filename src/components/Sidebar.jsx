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

  // Colors based on darkMode
  const bgColor = darkMode ? "bg-gray-900" : "bg-blue-800";
  const textColor = darkMode ? "text-gray-200" : "text-white";
  const hoverColor = darkMode ? "hover:bg-gray-800" : "hover:bg-blue-900";
  const hrColor = darkMode ? "border-gray-700" : "border-gray-400";

  return (
    <aside
      className={`${bgColor} lg:w-[250px] lg:h-full sm:h-full sm:fixed sm:w-[170px] auto lg:px-5 lg:py-8 sm:px-3 sm:py-8 lg:fixed top-0 left-0`}
    >
      <nav>
        <ul>
          <div>
            <h1
              className={`font-bold lg:text-xl text-center sm:text-xs  ${textColor}`}
            >
              Admin Panel
            </h1>
            <p
              className={`font-bold text-center mt-1 sm:text-xs lg:text-lg ${textColor}`}
            >
              Management Dashboard
            </p>
            <hr className={`mt-8 mb-6 sm:text-xs ${hrColor}`} />
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

          <hr className={`mt-20 mb-5 ${hrColor}`} />
          <Footer />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
