import React from "react";
import { useSelector } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";

const SalesReportOverall = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const cardClass = `p-4 rounded shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  const sectionClass = `p-5 rounded shadow ${
    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
  }`;

  return (
    <>
      <div className="sm:ml-3 sm:mr-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <div className={cardClass}>
          <p className="text-gray-400 text-sm">Total Revenue (All Time)</p>
          <p className="font-bold sm:mt-1 sm:mb-1 lg:text-xl sm:text-sm">
            0.00
          </p>
          <p className="text-gray-400 text-xs">From all transactions</p>
        </div>

        <div className={cardClass}>
          <p className="text-gray-400 text-sm">Total Transactions</p>
          <p className="font-bold sm:mt-1 sm:mb-1 lg:text-xl sm:text-sm">0</p>
          <p className="text-gray-400 text-xs">All time</p>
        </div>
      </div>

      <div className={`${sectionClass} sm:mx-3 sm:mr-6 mb-5 `}>
        <h2 className="font-semibold mb-2 lg:text-xl">All Transactions</h2>
        <p className="text-gray-400 text-sm mb-4">
          Complete transaction history
        </p>

        <div
          className={`flex flex-col items-center justify-center py-10 border-2 border-dashed rounded ${
            darkMode ? "border-gray-500" : "border-gray-300"
          }`}
        >
          <FiShoppingBag className="text-gray-400 text-4xl mb-2" />
          <p className="text-gray-400">No transactions yet</p>
        </div>
      </div>
    </>
  );
};

export default SalesReportOverall;
