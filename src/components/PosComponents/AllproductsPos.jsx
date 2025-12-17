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
    grid sm:gap-8 lg:gap-4 w-full transition-all duration-300

    ${
      isModalOpen
        ? " sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        : " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    }

    ${isModalOpen ? "opacity-80" : ""}
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
              className={`w-full h-36 lg:h-40 object-cover rounded mb-3
              ${isModalOpen ? " " : ""}`}
            />

            <h2
              className={`font-semibold sm:text-sm lg:text-xl capitalize ${
                isModalOpen ? "sm:text-xs" : ""
              }`}
            >
              {item.name}
            </h2>

            <p className="sm:text-xs lg:text-lg text-gray-500 capitalize">
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}.
            </p>

            <p
              className={`font-bold mt-1 sm:text-xs lg:text-lg capitalize ${
                isModalOpen ? "text-xs" : ""
              }`}
            >
              PKR {item.price}
            </p>

            <p className="text-sm text-gray-500 mb-3 sm:text-xs lg:text-lg capitalize">
              Stock: {item.stock}
            </p>

            <button
              onClick={() => handleAddToCart(item)}
              disabled={item.stock <= 0}
              className={`w-full sm:py-2 sm:px-1 lg:py-2 lg:text-lg sm:text-xs rounded-lg transition cursor-pointer ${
                item.stock > 0
                  ? theme === "dark"
                    ? "bg-white text-black hover:scale-95"
                    : "bg-black text-white hover:scale-95"
                  : "bg-gray-400 text-white"
              }`}
            >
              {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
              {isModalOpen ? "sm:text-xs" : ""}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AllproductsPos;
