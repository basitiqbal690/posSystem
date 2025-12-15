import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/CartSlice";
import { updateProductStock } from "../../store/slice/AddProductSlice";

const FitnessPos = () => {
  const products = useSelector((state) => state.productsAdd.products);
  const dispatch = useDispatch();

  // Filter only Fitness products
  const fitnessProducts = products.filter(
    (item) => item.category === "Fitness"
  );

  const handleAddToCart = (item) => {
    if (item.stock <= 0) return alert("Out of Stock!");
    dispatch(addToCart(item));
    dispatch(updateProductStock({ sku: item.sku, quantityChange: -1 }));
  };

  return (
    <div
      className="grid gap-6 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4"
    >
      {fitnessProducts.length === 0 ? (
        <p>No fitness products found.</p>
      ) : (
        fitnessProducts.map((item) => (
          <div
            key={item.sku}
            className="bg-white p-4 rounded-xl shadow transition transform hover:scale-95"
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
              className={`w-full py-2 rounded-lg text-white transition ${
                item.stock > 0
                  ? "bg-black hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
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

export default FitnessPos;
