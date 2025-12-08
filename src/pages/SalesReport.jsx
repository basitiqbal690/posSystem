import React, { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaDollarSign, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="bg-gray-200 min-h-screen p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <div>
          <h1 className="font-semibold text-2xl">Sales Reports</h1>
          <p className="text-gray-500 mt-1">
            View detailed sales reports and analytics
          </p>
        </div>

        {/* Date picker and Export */}
        <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 gap-3">
          <input type="date" className="p-2 rounded border border-gray-300" />
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 mb-5">
        <button
          className={`px-4 py-2 ${
            activeTab === "today"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Today's Report
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "overall"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("overall")}
        >
          Overall Stats
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "top"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("top")}
        >
          Top Products
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Today's Revenue</p>
            <p className="font-bold text-xl">$0.00</p>
            <p className="text-gray-400 text-xs">From 0 transactions</p>
          </div>
          <FaDollarSign className="text-green-500 text-2xl" />
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <p className="font-bold text-xl">0</p>
            <p className="text-gray-400 text-xs">Today</p>
          </div>
          <AiOutlineFileText className="text-blue-500 text-2xl" />
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
            <p className="font-bold text-xl">$0.00</p>
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
          <FaDollarSign className="text-gray-300 text-4xl mb-2" />
          <p className="text-gray-400">No transactions for this date</p>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
