import React from "react";

const DashboardHeader = ({ title, description }) => {
  return (
    <div className="lg:mt-5 sm:mt-2 pl-7 pt-7">
      <h1 className="font-semibold lg:text-2xl sm:text-xl">{title}</h1>
      <p className="text-gray-500 lg:text-xl sm:text-lg">{description}</p>
    </div>
  );
};

export default DashboardHeader;
