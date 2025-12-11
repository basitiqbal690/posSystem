import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { useSelector } from "react-redux";

// Dashboard Card
export const DashboardCard = ({ index }) => {
  const { cards } = useDashboard();
  const { title, value, icon, borderColor, subText } = cards[index];
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`inline-block h-40 w-60 ml-6 border-l-4 rounded-2xl
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        border-${borderColor}-500
      `}
    >
      <div className="flex justify-around items-center pt-4 pb-4">
        <p>{title}</p>
        <p
          className={`h-8 w-8 rounded flex justify-center items-center text-xl  ${
            darkMode ? "bg-black text-gray-200" : "bg-blue-200 text-gray-700"
          }`}
        >
          {icon}
        </p>
      </div>
      <div className="p-4">
        <p className="pl-2 text-xl font-bold">{value}</p>
        {subText && <div className="flex mt-2">{subText}</div>}
      </div>
    </div>
  );
};

// Inventory Card
export const InventryCard = ({ card }) => {
  const { title, value, icon, subText } = card;
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`p-6 rounded-xl shadow-lg border-l-4 flex flex-col justify-between h-[200px] 
        ${
          darkMode
            ? "bg-black text-white border-gray-700"
            : "bg-white text-black border-blue-500"
        }
      `}
    >
      <div className="flex justify-between items-center">
        <h3 className={`ml-3 font-semibold `}>{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>

      <p className="ml-3 text-3xl font-bold">{value}</p>

      <div className="text-md mt-2">{subText}</div>
    </div>
  );
};

// Default export MUST be DashboardCard
export default DashboardCard;
