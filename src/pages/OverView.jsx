import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import SectionCard from "../components/SectionCard";
import AlertCard from "../components/AlertCard";
import { useDashboard } from "../context/DashboardContext";
import { useSelector } from "react-redux";

const OverView = () => {
  const { cards, sectionCards } = useDashboard();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`relative pb-6  ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <DashboardHeader
        title="Dashboard "
        description="View key metrics and system overview"
        // className={darkMode ? "text-white" : "text-black"} // optional for header text
      />

      {/* Cards */}
      <div className="pt-9 pb-2 pl-1 flex flex-wrap">
        {cards.map((_, index) => (
          <DashboardCard key={index} index={index} />
        ))}
      </div>

      {/* Sections */}
      <div className="mt-5 pl-7 pt-4 pb-4 flex gap-6 flex-wrap">
        {sectionCards.map((_, index) => (
          <SectionCard key={index} index={index} />
        ))}
      </div>

      {/* Alert */}
      <AlertCard darkMode={darkMode} />
    </div>
  );
};

export default OverView;
