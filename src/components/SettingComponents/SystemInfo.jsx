import React from "react";
import {
  FiUploadCloud,
  FiDownloadCloud,
  FiAlertTriangle,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const SystemInfo = () => {
  // 🔥 Get total products from Redux store
  const totalProducts = useSelector(
    (state) => state.productsAdd.products.length
  );

  // Example static system data
  const systemInfo = [
    { id: 1, label: "App Version", value: "1.0.0" },
    { id: 2, label: "Last Backup", value: "Never" },
    { id: 3, label: "Total Products", value: totalProducts },
    { id: 4, label: "Total Transactions", value: 0 },
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow p-8 space-y-8">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span>🗂️</span> Data Management
          </h2>
          <p className="text-gray-500 text-sm">
            Backup, restore, and manage your system data
          </p>
        </div>

        {/* Export + Import Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div className="border border-blue-100 bg-blue-50/60 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiDownloadCloud className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Export Data</h3>
                <p className="text-gray-500 text-sm">
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
          <div className="border border-green-100 bg-green-50/60 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiUploadCloud className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Import Data</h3>
                <p className="text-gray-500 text-sm">
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
        <div className="border border-red-200 bg-red-50 rounded-xl p-6 shadow-sm">
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

      <div className="bg-white rounded-xl shadow p-8 space-y-8 mt-5">
        <div>
          <h2 className="text-xl font-semibold">System Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {systemInfo.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 bg-gray-50 rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-md font-semibold">{item.label}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SystemInfo;
