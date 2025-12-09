import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

import AllproductsPos from "../components/PosComponents/AllproductsPos";
import ElectronicsPos from "../components/PosComponents/ElectronicsPos";
import AppliancesPos from "../components/PosComponents/AppliancesPos";
import FitnessPos from "../components/PosComponents/FitnessPos";
import AccessoriesPos from "../components/PosComponents/AccessoriesPos";
import HomePos from "../components/PosComponents/HomePos";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../store/slice/CartSlice";
import { updateProductStock } from "../store/slice/AddProductSlice";

const Pos = () => {
  const [activeTab, setActiveTab] = useState("Allproducts");

  const cart = useSelector((state) => state.cart.cartItems);
  const taxRate = useSelector((state) => state.cart.taxRate);

  const dispatch = useDispatch();

  const handleDecreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQty(item.sku));
      dispatch(updateProductStock({ sku: item.sku, quantityChange: +1 }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.sku));
    dispatch(
      updateProductStock({ sku: item.sku, quantityChange: +item.quantity })
    );
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* TABS */}
      <div className="flex border-b border-gray-300 mb-5 text-xl mt-5 px-10 gap-10">
        <button
          onClick={() => setActiveTab("Allproducts")}
          className={`px-4 pb-2 ${
            activeTab === "Allproducts"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          All products
        </button>
        <button
          onClick={() => setActiveTab("Electronics")}
          className={`px-4 pb-2 ${
            activeTab === "Electronics"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Electronics
        </button>
        <button
          onClick={() => setActiveTab("Appliances")}
          className={`px-4 pb-2 ${
            activeTab === "Appliances"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Appliances
        </button>
        <button
          onClick={() => setActiveTab("Fitness")}
          className={`px-4 pb-2 ${
            activeTab === "Fitness"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Fitness
        </button>
        <button
          onClick={() => setActiveTab("Home")}
          className={`px-4 pb-2 ${
            activeTab === "Home"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab("Accessories")}
          className={`px-4 pb-2 ${
            activeTab === "Accessories"
              ? "border-b-2 border-black font-semibold"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Accessories
        </button>
      </div>

      {/* TAB CONTENT */}
      <div
        className={`px-6 transition-all duration-300 ${
          cart.length > 0 ? "pr-[380px]" : ""
        }`}
      >
        {activeTab === "Allproducts" && <AllproductsPos />}
        {activeTab === "Electronics" && <ElectronicsPos />}
        {activeTab === "Appliances" && <AppliancesPos />}
        {activeTab === "Fitness" && <FitnessPos />}
        {activeTab === "Home" && <HomePos />}
        {activeTab === "Accessories" && <AccessoriesPos />}
      </div>

      {/* RIGHT CART PANEL */}
      {cart.length > 0 && (
        <div className="fixed right-0 top-23 h-full w-[350px] bg-white shadow-xl p-5 border-l z-50">
          <h2 className="font-bold text-xl mb-4">Cart ({cart.length})</h2>
          <div className="space-y-4 max-h-[33vh] overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.sku}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">PKR {item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleDecreaseQty(item)}
                      className="bg-gray-300 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        dispatch(increaseQty(item.sku));
                        dispatch(
                          updateProductStock({
                            sku: item.sku,
                            quantityChange: -1,
                          })
                        );
                      }}
                      className="bg-gray-300 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <MdDeleteOutline
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-500 cursor-pointer text-xl"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>PKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax ({taxRate}%)</span>
              <span>PKR {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3">
              <span>Total</span>
              <span>PKR {total.toFixed(2)}</span>
            </div>
            <button className="bg-green-600 text-white mt-4 w-full py-3 rounded-lg">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pos;
