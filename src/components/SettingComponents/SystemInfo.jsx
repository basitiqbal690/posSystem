import React from "react";
import {
  FiUploadCloud,
  FiDownloadCloud,
  FiAlertTriangle,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const SystemInfo = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const totalProducts = useSelector(
    (state) => state.productsAdd.products.length
  );

  const systemInfo = [
    { id: 1, label: "App Version", value: "1.0.0" },
    { id: 2, label: "Last Backup", value: "Never" },
    { id: 3, label: "Total Products", value: totalProducts },
    { id: 4, label: "Total Transactions", value: 0 },
  ];

  const cardClass = (bg, border) =>
    `rounded-xl shadow p-6 ${
      darkMode
        ? `bg-gray-800 text-gray-800 border-gray-700`
        : `bg-${bg} text-gray-700 border-${border}`
    }`;

  const textGrayClass = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <>
      <div className={cardClass("white", "gray-200") + " space-y-8"}>
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>🗂️</span> Data Management
          </h2>
          <p className={`${textGrayClass} text-sm`}>
            Backup, restore, and manage your system data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div
            className={
              cardClass("blue-50/60", "blue-100") +
              " border hover:shadow-md transition"
            }
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiDownloadCloud className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Export Data</h3>
                <p className={`${textGrayClass} text-sm`}>
                  Download all products, transactions, and settings.
                </p>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2">
              <FiDownloadCloud className="text-xl" />
              Export All Data
            </button>
          </div>

          {/* Import Card */}
          <div
            className={
              cardClass("green-50/60", "green-100") +
              " border hover:shadow-md transition"
            }
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiUploadCloud className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import Data</h3>
                <p className={`${textGrayClass} text-sm`}>
                  Restore data from a previous backup file.
                </p>
              </div>
            </div>
            <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2">
              <FiUploadCloud className="text-xl" />
              Import Data
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={cardClass("red-50", "red-200") + " border"}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 rounded-lg">
              <FiAlertTriangle className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700">
                Danger Zone
              </h3>
              <p className="text-red-500 text-sm">
                This action cannot be undone. All products, transactions,
                categories, and settings will be permanently deleted.
              </p>
            </div>
          </div>
          <button className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg text-white font-medium transition flex items-center gap-2">
            <FiAlertTriangle className="text-lg" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className={cardClass("white", "gray-200") + " space-y-8 mt-5"}>
        <div className={` ${darkMode ? "text-gray-300 bg" : "text-gray-500"}`}>
          <h2 className="text-xl font-semibold">System Information</h2>
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            darkMode ? "text-gray-300 " : "text-gray-500"
          }`}
        >
          {systemInfo.map((item) => (
            <div
              key={item.id}
              className={
                `p-6 rounded ${darkMode ? "bg-black" : ""}` + " border"
              }
            >
              <h3 className="text-md font-semibold">{item.label}</h3>
              <p className={`${textGrayClass} text-sm mt-1`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SystemInfo;
