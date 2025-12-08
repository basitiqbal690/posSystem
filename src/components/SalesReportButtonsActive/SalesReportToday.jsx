import React from "react";
import { FaShoppingCart, FaChartLine } from "react-icons/fa";
// import { AiOutlineFileText } from "react-icons/ai";

import { FiShoppingBag } from "react-icons/fi";
const SalesReportToday = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Today's Revenue</p>
            <p className="font-bold text-xl">0.00</p>
            <p className="text-gray-400 text-xs">From 0 transactions</p>
          </div>
          {/* <FaDollarSign className="text-green-500 text-2xl" /> */}
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <p className="font-bold text-xl">0</p>
            <p className="text-gray-400 text-xs">Today</p>
          </div>
          {/* <AiOutlineFileText className="text-blue-500 text-2xl" /> */}
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Items Sold</p>
            <p className="font-bold text-xl">0</p>
            <p className="text-gray-400 text-xs">Total units</p>
          </div>
          <FaShoppingCart className="text-purple-500 text-2xl" />
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Avg Transaction</p>
            <p className="font-bold text-xl">0.00</p>
            <p className="text-gray-400 text-xs">Per transaction</p>
          </div>
          <FaChartLine className="text-orange-500 text-2xl" />
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-2">Today's Transactions</h2>
        <p className="text-gray-500 text-sm mb-4">Monday, December 8, 2025</p>
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded">
          <FiShoppingBag className="text-gray-300 text-4xl mb-2" />
          <p className="text-gray-400">No transactions for this date</p>
        </div>
      </div>
    </>
  );
};

export default SalesReportToday;
