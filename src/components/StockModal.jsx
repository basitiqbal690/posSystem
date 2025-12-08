// components/StockModal.jsx
import React, { useState } from "react";

const StockModal = ({
  open,
  setOpen,
  product,
  onUpdateStock,
  isRemove = false,
}) => {
  const [quantity, setQuantity] = useState(0);
  const newStock = isRemove
    ? product.stock - Number(quantity)
    : Number(product.stock) + Number(quantity);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isRemove ? "Remove Stock" : "Add Stock"}
        </h2>

        <p className="mb-2">
          {product.name} - Current Stock: {product.stock}
        </p>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Enter quantity"
        />

        <p className="mb-4 text-blue-600">
          New stock level will be: {newStock >= 0 ? newStock : 0}
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:scale-104 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:scale-104 cursor-pointer"
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
