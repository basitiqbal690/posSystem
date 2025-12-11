import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

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

const TaxInfo = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [includeTax, setIncludeTax] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taxName: "Sales Tax",
      taxRate: 10,
    },
  });

  const onSubmit = (data) => {
    console.log({ ...data, includeTax });
    alert("Tax settings saved successfully!");
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
    : "bg-gray-200 peer-checked:bg-black";
  const btnClass = darkMode
    ? "bg-green-700 text-white hover:bg-green-600"
    : "bg-black text-white hover:bg-gray-800";

  return (
    <div className={`${bgCard} rounded-xl shadow p-6`}>
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>💰</span> Tax Configuration
      </h2>
      <p className={`${textGray} mb-6`}>Set up tax rates and preferences</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Tax Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Tax Name *</label>
          <input
            {...register("taxName")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="Sales Tax"
          />
          {errors.taxName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxName.message}
            </p>
          )}
        </div>

        {/* Tax Rate */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Tax Rate (%) *</label>
          <input
            type="number"
            {...register("taxRate")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="10"
          />
          {errors.taxRate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxRate.message}
            </p>
          )}
        </div>

        {/* Include tax toggle (full width) */}
        <div
          className={`flex items-center justify-between col-span-2 p-4 rounded ${
            darkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div>
            <label className="font-medium">Include tax in product prices</label>
            <p className={`${textGray} text-sm`}>
              Tax will be included in displayed prices
            </p>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeTax}
                onChange={() => setIncludeTax(!includeTax)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full transition-all ${toggleBg}`}
              ></div>
              <div
                className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  includeTax ? "translate-x-full" : ""
                }`}
              ></div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-start mt-4">
          <button type="submit" className={`${btnClass} px-6 py-2 rounded`}>
            Save Tax Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxInfo;
