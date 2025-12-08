import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { FiAlertTriangle } from "react-icons/fi";

const AlertCard = () => {
  const { alertData } = useDashboard();
  const { text, borderColor } = alertData;

  return (
    <div
      className={`bg-white ml-4 border-l-4 rounded-xl mr-9 h-[30vh] mt-4 border-${borderColor}-400`}
    >
      <div className="ml-5 text-xl flex pt-6">
        <FiAlertTriangle className={`mt-1 mr-3 ml-1 text-${borderColor}-500`} />
        <h1>Inventory Alerts</h1>
      </div>
      <div className="ml-5 mt-7">
        <p className={`p-3 bg-red-100 mr-10 rounded-xl`}>{text}</p>
      </div>
    </div>
  );
};

export default AlertCard;
