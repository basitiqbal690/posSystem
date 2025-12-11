import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  name: yup.string().optional(),
  phone: yup
    .string()
    .optional()
    .matches(/^[0-9]*$/, "Phone must be digits"),
  notes: yup.string().optional(),
  paymentMethod: yup.string().required("Please select a payment method"),
  amountPaid: yup.number().when("paymentMethod", {
    is: "Cash",
    then: yup
      .number()
      .typeError("Amount Paid must be a number")
      .required("Amount Paid is required")
      .min(
        yup.ref("totalAmount"),
        "Amount Paid must be equal or greater than total amount"
      ),
    otherwise: yup.number().notRequired(),
  }),
});

const CheckoutModal = ({ totalAmount, onClose, onComplete }) => {
  const darkMode = useSelector((state) => state.theme.darkMode); // boolean

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: "Cash",
      name: "",
      phone: "",
      notes: "",
      amountPaid: "",
      totalAmount,
    },
  });

  const paymentMethod = watch("paymentMethod");
  const amountPaidRaw = watch("amountPaid");
  const amountPaid = parseFloat(amountPaidRaw) || 0;
  const change = amountPaid >= totalAmount ? amountPaid - totalAmount : 0;

  useEffect(() => {
    setValue("totalAmount", totalAmount);
    clearErrors("amountPaid");
  }, [totalAmount, setValue, clearErrors]);

  const submitHandler = (data) => {
    if (paymentMethod === "Cash" && amountPaid < totalAmount) {
      alert("Amount paid must be equal or greater than total amount.");
      return;
    }
    alert("Payment completed successfully");
    onComplete(data);
  };

  const presetAmounts = [2000, 5000, 10000, 20000];

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50">
      <div className="absolute inset-0 backdrop-blur-md"></div>

      <div
        className={`relative rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg p-6 transition-colors ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-black"
        }`}
      >
        <h2
          className={`"text-blue-600 font-semibold text-lg mb-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          Complete Payment
        </h2>

        <div
          className={`rounded-md p-4 text-center mb-6 ${
            darkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-blue-800"
          }`}
        >
          <p>Total Amount</p>
          <p className={`text-2xl font-bold`}>PKR {totalAmount.toFixed(2)}</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <div className="flex gap-3">
              {["Cash", "Card", "Mobile"].map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => {
                    setValue("paymentMethod", method);
                    if (method !== "Cash") setValue("amountPaid", "");
                  }}
                  className={`border rounded-md flex-1 py-2 text-center ${
                    paymentMethod === method
                      ? "border-blue-600 bg-blue-200 font-semibold"
                      : darkMode
                      ? "border-gray-600 bg-gray-700 text-black"
                      : "border-gray-300 bg-white text-black"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {paymentMethod === "Cash" && (
            <>
              <div>
                <label className="block font-medium mb-1">Amount Paid</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register("amountPaid")}
                    className={`w-full border rounded-md p-2 ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-800"
                        : "border-gray-300 bg-white text-black"
                    }`}
                    placeholder="Enter amount paid"
                  />
                  <button
                    type="button"
                    className={`border rounded-md px-3 flex items-center justify-center ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-800"
                        : "border-gray-300 bg-white text-black"
                    }`}
                    onClick={() =>
                      setValue(
                        "amountPaid",
                        (amountPaid + totalAmount).toFixed(2),
                        { shouldValidate: true }
                      )
                    }
                    title="Add total amount"
                  >
                    &#x1F4B3;
                  </button>
                </div>
                {errors.amountPaid && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.amountPaid.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 mb-4">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`border rounded-md px-4 py-2 ${
                      darkMode
                        ? "border-gray-600 bg-gray-700 text-gray-800 hover:bg-gray-600"
                        : "border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      setValue("amountPaid", (amountPaid + amt).toFixed(2), {
                        shouldValidate: true,
                      })
                    }
                  >
                    PKR {amt}
                  </button>
                ))}
              </div>

              {amountPaid >= totalAmount && (
                <div
                  className={`rounded-md p-4 font-semibold ${
                    darkMode
                      ? "bg-green-900 border-green-700 text-green-300"
                      : "bg-green-100 border-green-300 text-green-700"
                  }`}
                >
                  <div className="text-sm mb-1">Change</div>
                  <div className="text-2xl font-bold">
                    PKR {change.toFixed(2)}
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block font-medium mb-1">Name (Optional)</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Customer name"
              className={`w-full border rounded-md p-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-gray-800"
                  : "border-gray-300 bg-white text-black"
              }`}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone (Optional)</label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Phone number"
              className={`w-full border rounded-md p-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-gray-800"
                  : "border-gray-300 bg-white text-black"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Notes (Optional)</label>
            <textarea
              {...register("notes")}
              placeholder="Add any notes..."
              rows={3}
              className={`w-full border rounded-md p-2 resize-none ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-gray-800"
                  : "border-gray-300 bg-white text-black"
              }`}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
