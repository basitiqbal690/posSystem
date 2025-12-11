import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

let dataObj = [
  { id: 1, heading: "Show store logo on receipt" },
  { id: 2, heading: "Show transaction barcode" },
  { id: 3, heading: "Print receipt automatically" },
];

// Validation schema
const schema = yup.object().shape({
  taxName: yup.string().required("Header Message is required"),
  taxRate: yup.string().required("Footer Message is required"),
});

const ReceiptInfo = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [settings, setSettings] = useState({
    1: false,
    2: false,
    3: false,
  });

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
    console.log({ ...data, settings });
    alert("Receipt settings saved successfully!");
  };

  const inputBase =
    "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2";
  const inputLight = "border-gray-300 bg-white text-black focus:ring-blue-400";
  const inputDark =
    "border-gray-600 bg-gray-700 text-white focus:ring-blue-500";

  const bgCard = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  const textGray = darkMode ? "text-gray-300" : "text-gray-500";
  const toggleBg = darkMode
    ? "bg-gray-700 peer-checked:bg-green-600"
    : "bg-gray-300 peer-checked:bg-black";
  const btnClass = darkMode
    ? "bg-green-700 text-white hover:bg-green-600"
    : "bg-black text-white hover:bg-gray-800";

  return (
    <div className={`${bgCard} rounded-xl shadow p-6`}>
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>🧾</span> Receipt Configuration
      </h2>
      <p className={`${textGray} mb-6`}>Customize receipt preferences</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Header Message */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Header Message *</label>
          <textarea
            {...register("taxName")}
            className={`${inputBase} ${
              darkMode ? inputDark : inputLight
            } h-24 resize-none`}
            placeholder="Thank you for shopping with us!"
          />
          {errors.taxName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxName.message}
            </p>
          )}
        </div>

        {/* Footer Message */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Footer Message *</label>
          <textarea
            {...register("taxRate")}
            className={`${inputBase} ${
              darkMode ? inputDark : inputLight
            } h-24 resize-none`}
            placeholder="Please come again"
          />
          {errors.taxRate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxRate.message}
            </p>
          )}
        </div>

        {/* Receipt Toggles */}
        {dataObj.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between col-span-2 mt-3 p-4 rounded ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <label className="font-medium">{item.heading}</label>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.id]}
                onChange={() => handleToggle(item.id)}
                className="sr-only peer"
              />
              {/* Track */}
              <div
                className={`relative w-11 h-6 rounded-full transition-all ${toggleBg}`}
              ></div>
              {/* Thumb */}
              <div
                className={`absolute w-5 h-5 bg-white rounded-full shadow left-0.5 top-0.5 transition-transform ${
                  settings[item.id] ? "translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        ))}

        {/* Submit Button */}
        <div className="col-span-2 flex justify-start mt-4">
          <button type="submit" className={`${btnClass} px-6 py-2 rounded`}>
            Save Receipt Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiptInfo;
