import React from "react";
import { useDashboard } from "../context/DashboardContext";

const SectionCard = ({ index }) => {
  const { sectionCards } = useDashboard();
  const { title, Icon, text } = sectionCards[index];

  return (
    <div className="w-[37vw] h-[45vh] rounded-xl bg-white">
      <h1 className="p-7 text-xl">{title}</h1>
      <div className="flex justify-center items-center mt-7">
        <div className="text-center">
          <Icon className="text-4xl text-gray-400 mx-auto" />
          <p className="mt-2 text-xl text-gray-400">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
