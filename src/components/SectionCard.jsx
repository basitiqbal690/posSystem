import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { useSelector } from "react-redux";

const SectionCard = ({ index }) => {
  const { sectionCards } = useDashboard();
  const { title, Icon, text } = sectionCards[index];
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`w-[37vw] h-[45vh] rounded-xl p-7  ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex justify-center items-center mt-7">
        <div className="text-center">
          <Icon
            className={`text-4xl mx-auto  ${
              darkMode ? "text-gray-300" : "text-gray-400"
            }`}
          />
          <p
            className={`mt-2 text-xl  ${
              darkMode ? "text-gray-300" : "text-gray-400"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
