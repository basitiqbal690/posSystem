import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  paymentMethod: yup.string().required(),
  amountPaid: yup.number().when("paymentMethod", {
    is: "Cash",
    then: yup.number().required(),
  }),
});

const CheckoutModal = ({ totalAmount, onClose, onComplete }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const { register, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentMethod: "Cash",
      amountPaid: "",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const amountPaid = parseFloat(watch("amountPaid")) || 0;
  const change = Math.max(amountPaid - totalAmount, 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const submitHandler = (data) => {
    if (paymentMethod === "Cash" && amountPaid < totalAmount) return;
    onComplete(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start sm:items-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div
        className={`relative w-full sm:w-[600px] max-h-screen sm:max-h-[85vh]
          overflow-y-auto p-6 rounded-none sm:rounded-xl
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
      >
        <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>

        <div className="p-4 text-center rounded mb-6 bg-green-100 text-green-800">
          <p>Total</p>
          <p className="text-2xl font-bold">PKR {totalAmount}</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="flex gap-2">
            {["Cash", "Card", "Mobile"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setValue("paymentMethod", method)}
                className={`flex-1 py-2 rounded border ${
                  paymentMethod === method
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          {paymentMethod === "Cash" && (
            <>
              <input
                type="number"
                {...register("amountPaid")}
                placeholder="Amount Paid"
                className="w-full p-2 border rounded"
              />

              {amountPaid >= totalAmount && (
                <div className="p-3 bg-green-100 rounded">
                  Change: PKR {change}
                </div>
              )}
            </>
          )}

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded"
            >
              Complete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
