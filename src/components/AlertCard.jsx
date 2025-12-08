import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { FiAlertTriangle } from "react-icons/fi";

const AlertCard = () => {
  const { alertData } = useDashboard();
  const { text, borderColor } = alertData;

  return (
    <div
      className={`
        bg-white rounded-xl border-l-4 shadow-sm
        mx-3 sm:mx-6 lg:mx-9
        mt-4 p-4 sm:p-5
        border-${borderColor}-500
        w-full md:w-[90%] lg:w-[93.3%]
      `}
      style={{ minHeight: "28vh" }}
    >
      {/* Header */}
      <div className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold">
        <FiAlertTriangle
          className={`
            mr-3 text-2xl sm:text-3xl md:text-4xl
            text-${borderColor}-500
          `}
        />
        <h1 className="truncate">Inventory Alerts</h1>
      </div>

      {/* Text */}
      <div className="mt-5 sm:mt-7 md:mt-9">
        <p className="p-3 sm:p-4 md:p-5 bg-red-100 rounded-xl text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AlertCard;
