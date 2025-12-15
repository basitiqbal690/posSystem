import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/CartSlice";
import { updateProductStock } from "../../store/slice/AddProductSlice";

const AllproductsPos = ({ isModalOpen }) => {
  const products = useSelector((state) => state.productsAdd.products);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    if (item.stock <= 0) return alert("Out of Stock!");
    dispatch(addToCart(item));
    dispatch(updateProductStock({ sku: item.sku, quantityChange: -1 }));
  };

  return (
    <div
      className={`
        grid gap-4
        grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        w-full
        transition-all duration-300
        ${isModalOpen ? "sm:opacity-80 pointer-events-none" : ""}
      `}
    >
      {products.length === 0 ? (
        <p className={theme === "dark" ? "text-white" : "text-black"}>
          No products found.
        </p>
      ) : (
        products.map((item) => (
          <div
            key={item.sku}
            className={`p-4 rounded-xl shadow
              ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }
            `}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 lg:h-40 object-cover rounded mb-3"
            />

            <h2 className="font-semibold text-sm lg:text-lg">{item.name}</h2>

            <p className="text-xs text-gray-500">{item.category}</p>

            <p className="font-bold mt-1">PKR {item.price}</p>

            <p className="text-sm text-gray-500 mb-3">Stock: {item.stock}</p>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={item.stock <= 0}
              className={`w-full py-2 rounded-lg transition ${
                item.stock > 0
                  ? theme === "dark"
                    ? "bg-white text-black hover:scale-95"
                    : "bg-black text-white hover:scale-95"
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

export default AllproductsPos;
