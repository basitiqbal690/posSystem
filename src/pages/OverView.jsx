import React from "react";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import SectionCard from "../components/SectionCard";
import AlertCard from "../components/AlertCard";
import { useDashboard } from "../context/DashboardContext";

const OverView = () => {
  const { cards, sectionCards } = useDashboard();

  return (
    <div className="bg-gray-200 relative">
      <DashboardHeader
        title="Dashboard Overview"
        description="View key metrics and system overview"
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
      <AlertCard />
    </div>
  );
};

export default OverView;
