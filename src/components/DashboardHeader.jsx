import React from "react";

const DashboardHeader = ({ title, description }) => {
  return (
    <div className="mt-5 pl-7 pt-7">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <p className="text-gray-500 text-xl">{description}</p>
    </div>
  );
};

export default DashboardHeader;
