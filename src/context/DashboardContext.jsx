// src/context/DashboardContext.jsx
import { createContext, useContext } from "react";
import { BsGraphUp, BsBox } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";
import { CgShoppingBag } from "react-icons/cg";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const dashboardData = {
    cards: [
      {
        title: "Total Revenue ",
        value: "$0.00",
        icon: "$",
        borderColor: "green",
        subText: (
          <div className="flex pl-2 mt-2">
            <BsGraphUp className="mr-2 mt-1" />
            All time
          </div>
        ),
      },
      {
        title: "Today's Revenue",
        value: "$0.00",
        icon: "$",
        borderColor: "blue",
        subText: <span className="ml-2">0 transaction</span>,
      },
      {
        title: "Total Products",
        value: "16",
        icon: "$",
        borderColor: "purple",
        subText: <span className="ml-2">Active Products</span>,
      },
      {
        title: "Stock Alert",
        value: "3",
        icon: <FiAlertTriangle color="red" />,
        borderColor: "orange",
        subText: <span className="ml-4 text-red-500">0 out of stock</span>,
      },
    ],

    InventryCards: [
      {
        title: "Total Products",
        value: "15",
        icon: <FiAlertTriangle color="red" />,
        borderColor: "orange",
        subText: <span className="ml-4 text-red-500">Active products</span>,
      },
      {
        title: "Low Stock Items",
        value: "2",
        icon: <FiAlertTriangle color="red" />,
        borderColor: "orange",
        subText: <span className="ml-4 text-red-500">Below 10 units</span>,
      },
      {
        title: "Out of Stocks",
        value: "0",
        icon: <FiAlertTriangle color="red" />,
        borderColor: "orange",
        subText: <span className="ml-4 text-red-500">Requires restock</span>,
      },
    ],

    sectionCards: [
      {
        title: "Recent Transactions",
        Icon: CgShoppingBag,
        text: "No Sales data yet",
      },
      { title: "Top Selling Products", Icon: BsBox, text: "No Sales data yet" },
    ],

    alertData: {
      text: "3 Products have low stock (below 10 units)",
      borderColor: "amber",
    },
  };

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
