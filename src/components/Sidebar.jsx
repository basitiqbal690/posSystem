import React, { useState } from "react";
import { GrOverview } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineInventory2 } from "react-icons/md";
import { FaChartLine, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Colors based on darkMode
  const bgColor = darkMode ? "bg-gray-900" : "bg-blue-800";
  const textColor = darkMode ? "text-gray-200" : "text-white";
  const hoverColor = darkMode ? "hover:bg-gray-800" : "hover:bg-blue-900";
  const hrColor = darkMode ? "border-gray-700" : "border-gray-400";

  return (
    <>
      {/* ====== Toggle Button (sm/md) ====== */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-800 dark:bg-gray-900 p-2 rounded text-white"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu size={22} />
      </button>

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-40
          ${bgColor} w-[250px] h-full px-5 py-8
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav>
          <ul>
            <div>
              <h1 className={`font-bold text-xl text-center ${textColor}`}>
                Admin Panel
              </h1>
              <p className={`font-bold text-center mt-1 ${textColor}`}>
                Management Dashboard
              </p>
              <hr className={`mt-8 mb-6 ${hrColor}`} />
            </div>

            {/* Menu Items */}
            <Link
              to="/dashboard/overview"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <GrOverview className="text-xl" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/dashboard/products"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <AiOutlineProduct className="text-xl" />
              <span>Products</span>
            </Link>

            <Link
              to="/dashboard/categories"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <MdOutlineCategory className="text-xl" />
              <span>Categories</span>
            </Link>

            <Link
              to="/dashboard/inventory"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <MdOutlineInventory2 className="text-xl" />
              <span>Inventory</span>
            </Link>

            <Link
              to="/dashboard/salesReport"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <FaChartLine className="text-xl" />
              <span>Sales Report</span>
            </Link>

            <Link
              to="/dashboard/pos"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <FaChartLine className="text-xl" />
              <span>POS</span>
            </Link>

            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <FaUserCircle className="text-xl" />
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard/setting"
              className={`flex items-center gap-4 text-lg p-3 rounded-md ${textColor} ${hoverColor}`}
              onClick={() => setOpen(false)}
            >
              <IoSettingsOutline className="text-xl" />
              <span>Settings</span>
            </Link>

            <hr className={`mt-20 mb-5 ${hrColor}`} />
            <Footer />
          </ul>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
