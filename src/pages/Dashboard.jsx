import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import OverView from "../pages/OverView";
import Products from "../pages/Products";
import Categories from "../pages/Categories";
import Inventory from "../pages/Inventory";
import SalesReport from "../pages/SalesReport";
import Setting from "../pages/Setting";

import { DashboardProvider } from "../context/DashboardContext";

const Dashboard = () => {
  return (
    <DashboardProvider>
      <div className="flex">
        <Sidebar />

        <div className="ml-[250px] flex-1">
          <Navbar />

          <main className="pt-[70px] min-h-screen overflow-auto">
            <Routes>
              <Route path="overview" element={<OverView />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="salesReport" element={<SalesReport />} />
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
