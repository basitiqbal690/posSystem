import React from "react";

import { FiShoppingBag } from "react-icons/fi";

const SalesReportTop = () => {
  return (
    <>
      {/* Transactions Section */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="font-semibold mb-2">Top Selling Products</h2>
        <p className="text-gray-500 text-sm mb-4">
          Best performing products by revenue
        </p>
        <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-300 rounded">
          <FiShoppingBag className="text-gray-300 text-4xl mb-2" />
          <p className="text-gray-400">No sales data available</p>
        </div>
      </div>
    </>
  );
};

export default SalesReportTop;
