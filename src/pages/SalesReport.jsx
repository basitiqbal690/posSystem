import React, { useState } from "react";
import SalesReportToday from "../components/SalesReportButtonsActive/SalesReportToday";
import SalesReportOverall from "../components/SalesReportButtonsActive/SalesReportOverall";
import SalesReportTop from "../components/SalesReportButtonsActive/SalesReportTop";

const SalesReport = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="bg-gray-200 min-h-screen p-7">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5">
        <div>
          <h1 className="font-semibold text-2xl mt-6">Sales Reports</h1>
          <p className="text-gray-500 mt-2">
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
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "today"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Today's Report
        </button>

        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "overall"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("overall")}
        >
          Overall Stats
        </button>

        <button
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "top"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => setActiveTab("top")}
        >
          Top Products
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-9">
        {activeTab === "today" && <SalesReportToday />}
        {activeTab === "overall" && <SalesReportOverall />}
        {activeTab === "top" && <SalesReportTop />}
      </div>
    </div>
  );
};

export default SalesReport;
