import React, { useState } from "react";
import { useSelector } from "react-redux";
import SalesReportToday from "../components/SalesReportButtonsActive/SalesReportToday";
import SalesReportOverall from "../components/SalesReportButtonsActive/SalesReportOverall";
import SalesReportTop from "../components/SalesReportButtonsActive/SalesReportTop";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("today");
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`min-h-screen p-7 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <div>
          <h1 className="font-semibold text-2xl mt-6">Sales Reports</h1>
          <p className="text-gray-500 mt-2">
            View detailed sales reports and analytics
          </p>
        </div>

        {/* Date + Export */}
        <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 gap-3">
          <input
            type="date"
            className={`p-2 rounded border ${
              darkMode ? " text-black" : "bg-white border-gray-300 text-black"
            }`}
          />
          <button className="bg-gray-700 cursor-pointer text-white px-4 py-2 rounded hover:bg-gray-800">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4  border-gray-300 mb-5">
        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "today"
              ? " border-black font-semibold"
              : "text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Today’s Report
        </button>

        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "overall"
              ? " border-black font-semibold"
              : "text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("overall")}
        >
          Overall Stats
        </button>

        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "top"
              ? " border-black font-semibold"
              : "text-gray-500 hover:text-gray-400"
          }`}
          onClick={() => setActiveTab("top")}
        >
          Top Products
        </button>
      </div>

      {/* Content */}
      <div className="mt-9">
        {activeTab === "today" && <SalesReportToday />}
        {activeTab === "overall" && <SalesReportOverall />}
        {activeTab === "top" && <SalesReportTop />}
      </div>
    </div>
  );
};

export default SalesReport;
