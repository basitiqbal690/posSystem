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
      className={`
       lg:w-full
    rounded-xl
    border-l-4
    shadow-sm
    p-4 sm:p-5
    mt-6
    smLml-10
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        border-red-500
      `}
    >
      {/* HEADER */}
      <div className="flex items-center text-lg sm:text-xl font-semibold">
        <FiAlertTriangle
          className={`mr-3 text-2xl sm:text-3xl ${
            darkMode ? "text-yellow-500" : "text-red-500"
          }`}
        />
        <h1 className="truncate">Inventory Alerts</h1>
      </div>

      {/* CONTENT */}
      <div className="mt-4 sm:mt-6">
        <p
          className={`p-4 rounded-xl leading-relaxed text-sm sm:text-base ${
            darkMode ? "bg-red-900 text-red-200" : "bg-red-100 text-gray-700"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default AlertCard;
