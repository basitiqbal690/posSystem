import React, { useState } from "react";
import { useSelector } from "react-redux";
import StoreInfo from "../components/SettingComponents/StoreInfo";
import TaxInfo from "../components/SettingComponents/TaxInfo";
import ReceiptInfo from "../components/SettingComponents/ReceiptInfo";
import UserInfo from "../components/SettingComponents/UserInfo";
import PayementInfo from "../components/SettingComponents/PayementInfo";
import SystemInfo from "../components/SettingComponents/SystemInfo";

const Setting = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [activeTab, setActiveTab] = useState("store");

  const bgBase = darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black";
  const tabActive = darkMode
    ? " border-white font-semibold "
    : " border-black font-semibold";
  const tabInactive = darkMode
    ? "text-gray-400 hover:text-white"
    : "text-gray-500 hover:text-black";

  return (
    <div className={`relative min-h-screen overflow-hidden ${bgBase}`}>
      <div className="mt-5 pl-7 pt-7">
        <h1 className="font-semibold text-2xl">System Settings</h1>
        <p
          className={
            darkMode ? "text-gray-300 text-xl" : "text-gray-500 text-xl"
          }
        >
          Configure system settings and preferences
        </p>
      </div>

      {/* Tab Buttons */}
      <div
        className={`flex justify-between 
          ${
            darkMode ? "border-gray-600" : "border-gray-300"
          } mb-5 text-xl mt-5 mr-10
        `}
      >
        {[
          { id: "store", label: "Store" },
          { id: "tax", label: "Tax" },
          { id: "receipt", label: "Receipt" },
          { id: "user", label: "User" },
          { id: "payment", label: "Payment" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-12 py-2 cursor-pointer  ${
              activeTab === tab.id ? tabActive : tabInactive
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="m-6 ">
        {activeTab === "store" && <StoreInfo />}
        {activeTab === "tax" && <TaxInfo />}
        {activeTab === "receipt" && <ReceiptInfo />}
        {activeTab === "user" && <UserInfo />}
        {activeTab === "payment" && <PayementInfo />}
        {activeTab === "system" && <SystemInfo />}
      </div>
    </div>
  );
};

export default Setting;
