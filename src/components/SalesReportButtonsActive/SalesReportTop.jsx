import React from "react";
import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";

const SalesReportTop = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const sectionClass = `p-5 rounded shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <div className={`${sectionClass} sm:mx-3 sm:mr-6 mb-5`}>
      <h2 className="font-semibold mb-2 lg:text-xl">Top Selling Products</h2>
      <p className="text-gray-400 text-sm mb-4">
        Best performing products by revenue
      </p>

      <div
        className={`flex flex-col items-center justify-center py-10 border-2 border-dashed rounded ${
          darkMode ? "border-gray-500" : "border-gray-300"
        }`}
      >
        <FiShoppingBag className="text-gray-400 lg:text-4xl sm:text-2xl mb-2" />
        <p className="text-gray-400 sm:text-sm lg:text-xl">
          No sales data available
        </p>
      </div>
    </div>
  );
};

export default SalesReportTop;
