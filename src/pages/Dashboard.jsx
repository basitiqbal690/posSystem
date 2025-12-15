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
import Pos from "./Pos";

// Redux
// import { useSelector } from "react-redux";

const Dashboard = () => {
  // const darkMode = useSelector((state) => state.theme.darkMode); // get dark mode from Redux

  return (
    <DashboardProvider>
      <div className="flex w-full">
        <Sidebar />

        <div className="flex-1 ml-0 sm:ml-[170px] lg:ml-[250px] min-w-0">
          <Navbar />

          <main className="pt-[70px] w-full min-h-screen overflow-x-hidden">
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
