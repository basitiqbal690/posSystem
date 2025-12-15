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
      className={`relative pb-6 w-full overflow-x-hidden min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <DashboardHeader
        title="Dashboard "
        description="View key metrics and system overview"
      />

      {/* Cards */}
      <div className="mt-8 px-4 flex flex-wrap gap-2 sm:pb-4">
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
      <div className="sm:ml-7 sm:mr-4 lg:mx-8">
        <AlertCard darkMode={darkMode} className={`px-4 sm:px-6 lg:px-8`} />
      </div>
    </div>
  );
};

export default OverView;
