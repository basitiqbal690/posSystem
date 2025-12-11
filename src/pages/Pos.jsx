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

import CheckoutModal from "../components/PosComponents/CheckoutModal";

const Pos = () => {
  const [activeTab, setActiveTab] = useState("Allproducts");
  const [showModal, setShowModal] = useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode); // Dark mode state
  const cart = useSelector((state) => state.cart.cartItems);
  const taxRate = useSelector((state) => state.cart.taxRate);
  const dispatch = useDispatch();

  const openCheckoutModal = () => setShowModal(true);
  const closeCheckoutModal = () => setShowModal(false);

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

  const handleCompletePayment = (data) => {
    console.log("Payment completed with data:", data);
    closeCheckoutModal();
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } relative min-h-screen`}
    >
      {/* TABS */}
      <div
        className={`flex border-b mb-5 px-10 gap-5 pt-10 ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}
      >
        {[
          "Allproducts",
          "Electronics",
          "Appliances",
          "Fitness",
          "Home",
          "Accessories",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 pb-2 ${
              activeTab === tab
                ? "border-b-2 border-black font-semibold"
                : darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {tab === "Allproducts" ? "All Products" : tab}
          </button>
        ))}
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
        <div
          className={`fixed right-0 top-[90px] h-[calc(100vh-90px)] w-[350px] p-5 border-l shadow-xl overflow-y-auto z-50 transition-colors
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }
          `}
        >
          <h2 className="font-bold text-xl mb-4">Cart ({cart.length})</h2>

          <div className="space-y-4 max-h-[33vh] overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.sku}
                className={`flex justify-between items-center p-3 rounded-lg transition
                  ${darkMode ? "bg-gray-700" : "bg-gray-100"}
                `}
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">PKR {item.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleDecreaseQty(item)}
                      className={`px-2 rounded ${
                        darkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
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
                      className={`px-2 rounded ${
                        darkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
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

          <div className="mt-6 border-t pt-4 border-gray-400">
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

            <button
              onClick={openCheckoutModal}
              className="bg-green-600 text-white mt-4 w-full py-3 rounded-lg hover:scale-101 cursor-pointer"
            >
              Proceed to Checkout
            </button>

            {showModal && (
              <CheckoutModal
                totalAmount={total}
                onClose={closeCheckoutModal}
                onComplete={handleCompletePayment}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pos;
