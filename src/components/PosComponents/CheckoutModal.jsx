import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
      amountPaid: "", // start empty
      totalAmount, // used for validation
    },
  });

  const paymentMethod = watch("paymentMethod");
  const amountPaidRaw = watch("amountPaid");
  const amountPaid = parseFloat(amountPaidRaw) || 0;

  // Change is only calculated if amountPaid >= totalAmount
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

  const presetAmounts = [2000, 5000, 10000, 20000]; // example PKR preset buttons

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-10 z-50">
      <div className="absolute inset-0 backdrop-blur-md"></div>

      <div className="relative bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto shadow-lg p-6">
        <h2 className="text-blue-600 font-semibold text-lg mb-4">
          Complete Payment
        </h2>

        <div className="bg-blue-100 rounded-md p-4 text-center mb-6">
          <p className="text-gray-700">Total Amount</p>
          <p className="text-2xl font-bold text-blue-800">
            PKR {totalAmount.toFixed(2)}
          </p>
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
                      : "border-gray-300"
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
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter amount paid"
                  />
                  <button
                    type="button"
                    className="border rounded-md px-3 flex items-center justify-center"
                    onClick={() =>
                      setValue(
                        "amountPaid",
                        (amountPaid + totalAmount).toFixed(2),
                        {
                          shouldValidate: true,
                        }
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
                    className="border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
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

              {/* Change only shows if amountPaid >= totalAmount */}
              {amountPaid >= totalAmount && (
                <div className="bg-green-100 border border-green-300 rounded-md p-4 text-green-700 font-semibold">
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
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone (Optional)</label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Phone number"
              className="w-full border border-gray-300 rounded-md p-2"
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
              className="w-full border border-gray-300 rounded-md p-2 resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100 hover:scale-101 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:scale-101 cursor-pointer "
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
