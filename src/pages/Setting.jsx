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
        <h1 className="font-semibold text-xl">System Settings</h1>
        <p className="text-gray-500 text-xl">
          Configure system settings and preferences
        </p>
      </div>

      {/* Tab Buttons */}
      <div className="m-6 p-1 bg-white rounded-xl shadow flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab("store")}
          className={`px-14 font-bold py-2 border rounded-2xl ml-6 ${
            activeTab === "store" ? "bg-black text-white" : ""
          }`}
        >
          Store
        </button>
        <button
          onClick={() => setActiveTab("tax")}
          className={`px-14 font-bold py-2 border rounded-2xl ${
            activeTab === "tax" ? "bg-black text-white" : ""
          }`}
        >
          Tax
        </button>
        <button
          onClick={() => setActiveTab("receipt")}
          className={`px-14 font-bold py-2 border rounded-2xl ${
            activeTab === "receipt" ? "bg-black text-white" : ""
          }`}
        >
          Receipt
        </button>
        <button
          onClick={() => setActiveTab("user")}
          className={`px-14 font-bold py-2 border rounded-2xl ${
            activeTab === "user" ? "bg-black text-white" : ""
          }`}
        >
          User
        </button>
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-14 font-bold py-2 border rounded-2xl ${
            activeTab === "payment" ? "bg-black text-white" : ""
          }`}
        >
          Payment
        </button>
        <button
          onClick={() => setActiveTab("system")}
          className={`px-14 font-bold py-2 border rounded-2xl ${
            activeTab === "system" ? "bg-black text-white" : ""
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
