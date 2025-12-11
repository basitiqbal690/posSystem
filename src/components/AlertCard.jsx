import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { FiAlertTriangle } from "react-icons/fi";
import { useSelector } from "react-redux";

const AlertCard = () => {
  const { alertData } = useDashboard();
  const { text, borderColor } = alertData;
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`rounded-xl border-l-4 shadow-sm sm:mx-6 mt-4 p-4 sm:p-5 
        w-full md:w-[90%] lg:w-[94.2%] pb-10
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        border-${borderColor}-500
      `}
      style={{ minHeight: "28vh", marginLeft: "27px", Bottom: "20px" }}
    >
      {/* Header */}
      <div className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold">
        <FiAlertTriangle
          className={`mr-3 text-2xl sm:text-3xl md:text-4xl  ${
            darkMode ? "text-yellow-500" : `text-${borderColor}-500`
          }`}
        />
        <h1 className="truncate">Inventory Alerts</h1>
      </div>

      {/* Text */}
      <div className="mt-5 sm:mt-7 md:mt-9">
        <p
          className={`p-3 sm:p-4 md:p-5 rounded-xl leading-relaxed  ${
            darkMode
              ? "bg-red-900 text-red-200"
              : "bg-red-100 text-gray-700 text-sm sm:text-base md:text-lg"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default AlertCard;
