import React from "react";
import { GrOverview } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineCategory, MdOutlineInventory2 } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul className="bg-blue-800 w-[250px] h-full min-h-screen fixed top-0 left-0 px-5 py-8">
          <div>
            <h1 className="font-bold text-xl text-center text-white">
              Admin Panel
            </h1>
            <p className="font-bold text-center text-gray-300 mt-1">
              Management Dashboard
            </p>
            <hr className="border border-gray-400 mt-8 mb-6" />
          </div>

          <Link
            to="/dashboard/overview"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <GrOverview className="text-xl" />
            <span>Overview</span>
          </Link>

          <Link
            to="/dashboard/products"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <AiOutlineProduct className="text-xl" />
            <span>Products</span>
          </Link>

          <Link
            to="/dashboard/categories"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <MdOutlineCategory className="text-xl" />
            <span>Categories</span>
          </Link>

          <Link
            to="/dashboard/inventory"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <MdOutlineInventory2 className="text-xl" />
            <span>Inventory</span>
          </Link>

          <Link
            to="/dashboard/salesReport"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <FaChartLine className="text-xl" />
            <span>Sales Report</span>
          </Link>

          <Link
            to="/dashboard/setting"
            className="flex items-center gap-4 text-white text-lg p-3 hover:bg-blue-900 rounded-md cursor-pointer"
          >
            <IoSettingsOutline className="text-xl" />
            <span>Settings</span>
          </Link>

          <hr className="border border-gray-400 mt-20 mb-5" />

          <Footer />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
