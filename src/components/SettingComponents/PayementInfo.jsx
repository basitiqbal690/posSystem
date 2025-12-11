import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let dataObj = [
  { id: 1, heading: "Cash" },
  { id: 2, heading: "Credit Card" },
  { id: 3, heading: "Debit Payment" },
  { id: 4, heading: "Mobile Payment" },
];

const schema = yup.object().shape({
  lowStock: yup
    .number()
    .typeError("Low Stock Threshold must be a number")
    .required("Low Stock Threshold is required")
    .min(0, "Must be at least 1"),
});

const PayementInfo = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [settings, setSettings] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const [includeTax, setIncludeTax] = useState(false);
  const [dailyReport, setDailyReport] = useState(false);

  const handleToggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log({ paymentMethods: settings, includeTax, dailyReport, ...data });
    alert("Settings saved successfully!");
  };

  const cardClass = `rounded-xl shadow p-6 ${
    darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-700"
  }`;

  const toggleTrackClass = (checked) =>
    `w-11 h-6 rounded-full transition-colors ${
      checked ? "bg-black" : darkMode ? "bg-gray-600" : "bg-gray-300"
    }`;

  const toggleThumbClass = (checked) =>
    `absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
      checked ? "translate-x-full" : ""
    }`;

  return (
    <>
      {/* Payment Methods Section */}
      <div className={cardClass}>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>💳</span> Payment Methods
        </h2>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
          Enable or disable payment methods
        </p>

        {dataObj.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded mt-3 ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <label className="font-medium">{item.heading}</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.id]}
                onChange={() => handleToggle(item.id)}
                className="sr-only peer"
              />
              <div className={toggleTrackClass(settings[item.id])}></div>
              <div className={toggleThumbClass(settings[item.id])}></div>
            </label>
          </div>
        ))}
      </div>

      {/* Notifications Section */}
      <div className={`${cardClass} mt-4`}>
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>🔔</span> Notifications
        </h2>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-6`}>
          Configure system notifications and alerts
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Include Tax */}
          <div
            className={`flex items-center justify-between p-4 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div>
              <label className="font-medium">
                Include tax in product prices
              </label>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } text-sm`}
              >
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
              <div className={toggleTrackClass(includeTax)}></div>
              <div className={toggleThumbClass(includeTax)}></div>
            </label>
          </div>

          {/* Low Stock Threshold */}
          <div className="flex flex-col mt-4">
            <label className="font-medium mb-1">Low Stock Threshold *</label>
            <input
              type="number"
              min="0"
              {...register("lowStock")}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                darkMode ? "bg-gray-700 text-gray-200 border-gray-600" : ""
              }`}
              placeholder="10"
            />
            {errors.lowStock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lowStock.message}
              </p>
            )}
          </div>

          {/* Daily Report */}
          <div
            className={`flex items-center justify-between p-4 rounded mt-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div>
              <label className="font-medium">Daily Sales Report</label>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } text-sm`}
              >
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
              <div className={toggleTrackClass(dailyReport)}></div>
              <div className={toggleThumbClass(dailyReport)}></div>
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
