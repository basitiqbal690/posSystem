import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/CartSlice";
import { updateProductStock } from "../../store/slice/AddProductSlice";

const AccessoriesPos = () => {
  const products = useSelector((state) => state.productsAdd.products);
  const theme = useSelector((state) => state.theme.mode); // light | dark
  const dispatch = useDispatch();

  // Filter only Accessories category products
  const accessoriesProducts = products.filter(
    (item) => item.category === "Accessories"
  );

  const handleAddToCart = (item) => {
    if (item.stock <= 0) return alert("Out of Stock!");
    dispatch(addToCart(item));
    dispatch(updateProductStock({ sku: item.sku, quantityChange: -1 }));
  };

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4 sm:gap-6
        text-sm
        w-full
      "
    >
      {accessoriesProducts.length === 0 ? (
        <p className={theme === "dark" ? "text-white" : "text-black"}>
          No accessories products found.
        </p>
      ) : (
        accessoriesProducts.map((item) => (
          <div
            key={item.sku}
            className={`p-4 rounded-xl shadow transition w-full ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 sm:h-36 lg:h-40 object-cover rounded mb-3"
            />

            <h2 className="font-semibold text-sm sm:text-base lg:text-lg">
              {item.name}
            </h2>

            <p
              className={`text-xs sm:text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {item.category}
            </p>

            <p className="font-bold mt-1">PKR {item.price}</p>

            <p
              className={`text-sm mb-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Stock: {item.stock}
            </p>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={item.stock <= 0}
              className={`w-full py-2 rounded-lg transition ${
                item.stock > 0
                  ? theme === "dark"
                    ? "bg-white text-black hover:scale-95"
                    : "bg-black text-white hover:scale-95"
                  : theme === "dark"
                  ? "bg-gray-600 text-gray-200"
                  : "bg-gray-400 text-white"
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

export default AccessoriesPos;
