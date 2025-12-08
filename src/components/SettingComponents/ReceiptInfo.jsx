import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let dataObj = [
  { id: 1, heading: "Show store logo on receipt" },
  { id: 2, heading: "Show transaction barcode" },
  { id: 3, heading: "Print receipt automatically" },
];

// Validation schema
const schema = yup.object().shape({
  taxName: yup.string().required("Tax Name is required"),
  taxRate: yup
    .number()
    .typeError("Tax Rate must be a number")
    .required("Tax Rate is required")
    .min(0, "Tax Rate cannot be negative")
    .max(100, "Tax Rate cannot exceed 100"),
});

const ReceiptInfo = () => {
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
    console.log({
      ...data,
      settings,
    });
    alert("Receipt settings saved successfully!");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>🧾</span> Receipt Configuration
      </h2>
      <p className="text-gray-500 mb-6">Customize receipt preferences</p>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Tax Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Header Message*</label>
          <input
            {...register("taxName")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Thanks you for shopping with us!"
          />
          {errors.taxName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxName.message}
            </p>
          )}
        </div>

        {/* Tax Rate */}
        <div className="mt-4">
          <label className="font-medium mb-1">Footer Message (%) *</label>
          <input
            type="text"
            {...register("taxRate")}
            className="w-full mt-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 mb-4 focus:ring-blue-400"
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
            className="flex items-center justify-between col-span-2 mt-3 bg-gray-200 p-4 rounded"
          >
            <label className="font-medium ">{item.heading}</label>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.id]}
                onChange={() => handleToggle(item.id)}
                className="sr-only peer"
              />

              {/* Track */}
              <div className="relative w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-black transition-all"></div>

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
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Receipt Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceiptInfo;
