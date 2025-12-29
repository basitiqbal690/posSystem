import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import OverView from "../pages/OverView";
import Profile from "./Profile";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Inventory from "../pages/Inventory";
import SalesReport from "../pages/SalesReport";
import Setting from "../pages/Setting";
import { DashboardProvider } from "../context/DashboardContext";
import Pos from "../pages/Pos";

// Redux
// import { useSelector } from "react-redux";

const Dashboard = () => {
  // const darkMode = useSelector((state) => state.theme.darkMode); // get dark mode from Redux

  return (
    <DashboardProvider>
      <div className="flex w-full min-h-screen bg-gray-200 overflow-x-hidden">
        <div className="block">
          <Sidebar />
        </div>
        <div className=" flex flex-1 items-center sm:ml-[170px] md:ml-[200px] lg:ml-64 min-w-0">
          <Navbar />

          <main className="pt-[72px] w-full min-h-screen overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="overview" element={<OverView />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="salesReport" element={<SalesReport />} />
              <Route path="profile" element={<Profile />} />
              <Route path="pos" element={<Pos />} />
              <Route path="setting" element={<Setting />} />
              <Route path="" element={<Navigate to="overview" />} />
            </Routes>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;
