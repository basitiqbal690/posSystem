import React from "react";
import { useDashboard } from "../context/DashboardContext";

// Dashboard Card
export const DashboardCard = ({ index }) => {
  const { cards } = useDashboard();
  const { title, value, icon, borderColor, subText } = cards[index];

  return (
    <div
      className={`inline-block h-40 w-60 ml-6 border-l-4 rounded-2xl bg-white border-${borderColor}-500`}
    >
      <div className="flex justify-around items-center pt-4 pb-4">
        <p>{title}</p>
        <p className="h-8 w-8 rounded flex justify-center items-center bg-blue-200 text-xl text-gray-700">
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 flex flex-col justify-between h-[200px]">
      <div className="flex justify-between items-center">
        <h3 className="ml-3 text-gray-600 font-semibold">{title}</h3>
        <div className="text-2xl">{icon}</div>
      </div>

      <p className="ml-3 text-3xl font-bold">{value}</p>

      <div className="text-gray-500 text-md items-sta">{subText}</div>
    </div>
  );
};

// Default export MUST be DashboardCard
export default DashboardCard;
