import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/CartSlice";
import { updateProductStock } from "../../store/slice/AddProductSlice";

const ElectronicsPos = () => {
  const products = useSelector((state) => state.productsAdd.products);
  const dispatch = useDispatch();

  // Filter only Electronics
  const electronicsProducts = products.filter(
    (item) => item.category === "Electronics"
  );

  const handleAddToCart = (item) => {
    if (item.stock <= 0) return alert("Out of Stock!");
    dispatch(addToCart(item));
    dispatch(updateProductStock({ sku: item.sku, quantityChange: -1 }));
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {electronicsProducts.length === 0 ? (
        <p>No electronics products found.</p>
      ) : (
        electronicsProducts.map((item) => (
          <div
            key={item.sku}
            className="bg-white p-4 rounded-xl shadow transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-gray-500">{item.category}</p>
            <p className="font-bold mt-1">PKR {item.price}</p>
            <p className="text-gray-500 text-sm mb-3">Stock: {item.stock}</p>
            <button
              onClick={() => handleAddToCart(item)}
              disabled={item.stock <= 0}
              className={`w-full py-2 rounded-lg text-white ${
                item.stock > 0
                  ? "bg-black hover:bg-gray-800 hover:scale-95"
                  : "bg-gray-400"
              }`}
            >
              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ElectronicsPos;
