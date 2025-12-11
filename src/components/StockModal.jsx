import React, { useState } from "react";
import { useSelector } from "react-redux";

const StockModal = ({
  open,
  setOpen,
  product,
  onUpdateStock,
  isRemove = false,
}) => {
  const [quantity, setQuantity] = useState(0);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const newStock = isRemove
    ? product.stock - Number(quantity)
    : Number(product.stock) + Number(quantity);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div
        className={`
          p-6 rounded-xl w-[400px] shadow-lg
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
        `}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isRemove ? "Remove Stock" : "Add Stock"}
        </h2>

        <p className="mb-2">
          {product.name} - Current Stock:{" "}
          <span className="font-semibold">{product.stock}</span>
        </p>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={`
            border p-2 w-full mb-3 rounded 
            ${
              darkMode
                ? "bg-gray-700 border-gray-500 text-black"
                : "bg-white text-black"
            }
          `}
          placeholder="Enter quantity"
        />

        <p
          className={`
            mb-4 
            ${darkMode ? "text-blue-300" : "text-blue-600"}
          `}
        >
          New stock level will be:{" "}
          <span className="font-semibold">{newStock >= 0 ? newStock : 0}</span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            onClick={() => {
              onUpdateStock(quantity, isRemove);
              setOpen(false);
            }}
          >
            {isRemove ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockModal;
