import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>💰</span> Tax Configuration
      </h2>
      <p className="text-gray-500 mb-6">Set up tax rates and preferences</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Tax Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Tax Name *</label>
          <input
            {...register("taxName")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="10"
          />
          {errors.taxRate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.taxRate.message}
            </p>
          )}
        </div>

        {/* Include tax toggle (full width) */}
        <div className="flex items-center justify-between col-span-2 bg-gray-100 p-4 rounded">
          <div>
            <label className="font-medium">Include tax in product prices</label>
            <p className="text-gray-500 text-sm">
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
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition-all"></div>
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
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Tax Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxInfo;
