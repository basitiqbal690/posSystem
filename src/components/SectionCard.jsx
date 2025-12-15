import React from "react";
import { useDashboard } from "../context/DashboardContext";
import { useSelector } from "react-redux";

const SectionCard = ({ index }) => {
  const { sectionCards } = useDashboard();
  const { title, Icon, text } = sectionCards[index];
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`
        w-full
        sm:w-[calc(100%-0.5rem)]
        lg:w-[calc(48.4%-1rem)]
        min-h-[230px]
        sm:mr-4
        sm:mb-2
        rounded-xl
        p-6
        shadow-lg
        flex flex-col
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <Icon
            className={`text-4xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-400"
            }`}
          />
          <p
            className={`mt-3 text-lg ${
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
