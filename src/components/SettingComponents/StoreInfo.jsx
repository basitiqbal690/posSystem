import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-2">Store Information</h2>
      <p className="text-gray-500 mb-6">
        Configure your store details and contact information
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* Store Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Store Name *</label>
          <input
            {...register("storeName")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Store Name"
          />
          {errors.storeName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.storeName.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Phone Number *</label>
          <input
            {...register("phoneNumber")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="(555) 123-4567"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Address (full width) */}
        <div className="flex flex-col col-span-2">
          <label className="font-medium mb-1">Address *</label>
          <input
            {...register("address")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="123 Main Street"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">City *</label>
          <input
            {...register("city")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">State</label>
          <input
            {...register("state")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="NY"
          />
        </div>

        {/* Zip Code */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Zip Code</label>
          <input
            {...register("zipCode")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="10001"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            {...register("email")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="store@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Website</label>
          <input
            {...register("website")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="www.mystore.com"
          />
          {errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Submit Button (full width) */}
        <div className="col-span-2 flex justify-start mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Save Store Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreInfo;
