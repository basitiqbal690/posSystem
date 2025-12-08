import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let dataObj = [
  { id: 1, heading: "Cash" },
  { id: 2, heading: "Credit Card" },
  { id: 3, heading: "Debit Payment" },
  { id: 4, heading: "Mobile Payment" },
];

// Validation schema
const schema = yup.object().shape({
  lowStock: yup
    .number()
    .typeError("Low Stock Threshold must be a number")
    .required("Low Stock Threshold is required")
    .min(0, "Must be at least 1"),
});

const PayementInfo = () => {
  // Payment method toggles
  const [settings, setSettings] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // Notification Toggles (Independent)
  const [includeTax, setIncludeTax] = useState(false);
  const [dailyReport, setDailyReport] = useState(false);

  const handleToggle = (id) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log({
      paymentMethods: settings,
      includeTax,
      dailyReport,
      ...data,
    });

    alert("Settings saved successfully!");
  };

  return (
    <>
      {/* Payment Methods Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>💳</span> Payment Methods
        </h2>
        <p className="text-gray-500 mb-6">Enable or disable payment methods</p>

        {dataObj.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-200 p-4 rounded mt-3"
          >
            <label className="font-medium">{item.heading}</label>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.id]}
                onChange={() => handleToggle(item.id)}
                className="sr-only peer"
              />

              {/* Track */}
              <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors peer-checked:bg-black"></div>

              {/* Thumb */}
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings[item.id] ? "translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-xl shadow p-6 mt-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>🔔</span> Notifications
        </h2>
        <p className="text-gray-500 mb-6">
          Configure system notifications and alerts
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Include Tax Toggle */}
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded">
            <div>
              <label className="font-medium">
                Include tax in product prices
              </label>
              <p className="text-gray-500 text-sm">
                Tax will be included in displayed prices
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeTax}
                onChange={() => setIncludeTax(!includeTax)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors peer-checked:bg-black"></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  includeTax ? "translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>

          {/* Low Stock Threshold */}
          <div className="flex flex-col mt-4">
            <label className="font-medium mb-1">Low Stock Threshold *</label>
            <input
              type="number"
              min="0"
              {...register("lowStock")}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="10"
            />
            {errors.lowStock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lowStock.message}
              </p>
            )}
          </div>

          {/* Daily Report Toggle */}
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded mt-4">
            <div>
              <label className="font-medium">Daily Sales Report</label>
              <p className="text-gray-500 text-sm">
                Receive daily sales summary via email
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dailyReport}
                onChange={() => setDailyReport(!dailyReport)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors peer-checked:bg-black"></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  dailyReport ? "translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition mt-4"
          >
            Save Notification Settings
          </button>
        </form>
      </div>
    </>
  );
};

export default PayementInfo;
