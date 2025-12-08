import React, { useState } from "react";
import StoreInfo from "../components/SettingComponents/StoreInfo";
import TaxInfo from "../components/SettingComponents/TaxInfo";
import ReceiptInfo from "../components/SettingComponents/ReceiptInfo";
import UserInfo from "../components/SettingComponents/UserInfo";
import PayementInfo from "../components/SettingComponents/PayementInfo";
import SystemInfo from "../components/SettingComponents/SystemInfo";
// import other components like ReceiptInfo, UserInfo etc. when ready

const Setting = () => {
  // Track the active tab; default is "store"
  const [activeTab, setActiveTab] = useState("store");

  return (
    <div className="bg-gray-200 relative min-h-screen overflow-hidden">
      <div className="mt-5 pl-7 pt-7">
        <h1 className="font-semibold text-2xl">System Settings</h1>
        <p className="text-gray-500 text-xl">
          Configure system settings and preferences
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="flex  justify-between  border-b border-gray-300 mb-5 text-xl mt-5 mr-10">
        <button
          onClick={() => setActiveTab("store")}
          className={`px-4 py-2 mx-7 cursor-pointer transition-colors duration-200 ${
            activeTab === "store"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Store
        </button>

        <button
          onClick={() => setActiveTab("tax")}
          className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "tax"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Tax
        </button>

        <button
          onClick={() => setActiveTab("receipt")}
          className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "receipt"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Receipt
        </button>

        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "user"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          User
        </button>

        <button
          onClick={() => setActiveTab("payment")}
          className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "payment"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Payment
        </button>

        <button
          onClick={() => setActiveTab("system")}
          className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
            activeTab === "system"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          System
        </button>
      </div>

      {/* Tab Content */}
      <div className="m-6">
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
