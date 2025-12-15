import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

// Validation schema
const schema = yup.object().shape({
  storeName: yup.string().required("Store Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(
      /^\(\d{3}\) \d{3}-\d{4}$/,
      "Phone Number must be in format (123) 456-7890"
    ),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string(),
  zipCode: yup.string(),
  email: yup.string().email("Invalid email address"),
  website: yup.string().url("Invalid URL"),
});

const StoreInfo = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Store settings saved successfully!");
  };

  const inputBase = `w-full border rounded px-3 py-2 focus:outline-none focus:ring-2`;
  const inputLight = "border-gray-300 bg-white text-black focus:ring-blue-400";
  const inputDark =
    "border-gray-600 bg-gray-700 text-white focus:ring-blue-500";

  const bgCard = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  const textGray = darkMode ? "text-gray-300" : "text-gray-500";
  const btnClass = darkMode
    ? "bg-green-700 text-white hover:bg-green-600"
    : "bg-black text-white hover:bg-gray-800";

  return (
    <div className={`${bgCard} rounded-xl shadow p-6`}>
      <h2 className="text-lg font-semibold mb-2">Store Information</h2>
      <p className={`${textGray} mb-6`}>
        Configure your store details and contact information
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Row 1: Store Name | Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Store Name *</label>
          <input
            {...register("storeName")}
            className={`${inputBase} ${
              darkMode ? " text-black" : "bg-black text-black"
            }`}
            placeholder="Store Name"
          />
          {errors.storeName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Phone Number *</label>
          <input
            {...register("phoneNumber")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="(555) 123-4567"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Row 2: Email | Address */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            {...register("email")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="store@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Address *</label>
          <input
            {...register("address")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="123 Main Street"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Row 3: City | State */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">City *</label>
          <input
            {...register("city")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">State</label>
          <input
            {...register("state")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="NY"
          />
        </div>

        {/* Row 4: Zip Code | Website */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Zip Code</label>
          <input
            {...register("zipCode")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="10001"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Website</label>
          <input
            {...register("website")}
            className={`${inputBase} ${darkMode ? inputDark : inputLight}`}
            placeholder="www.mystore.com"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-start mt-4">
          <button type="submit" className={`${btnClass} px-6 py-2 rounded`}>
            Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreInfo;
