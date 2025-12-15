import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useSelector, useDispatch } from "react-redux";
import StockModal from "../components/StockModal";
import { updateProductStock } from "../store/slice/AddProductSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Inventory = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productsAdd.products);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [filter, setFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const filteredProducts = productList.filter((p) => {
    if (filter === "all") return true;
    if (filter === "low") return Number(p.stock) > 0 && Number(p.stock) <= 10;
    if (filter === "out") return Number(p.stock) === 0;
    return true;
  });

  const handleStockUpdate = (product, remove = false) => {
    setSelectedProduct(product);
    setIsRemove(remove);
    setModalOpen(true);
  };

  const onUpdateStock = (quantity, remove) => {
    const qtyChange = remove ? -Number(quantity) : Number(quantity);
    dispatch(
      updateProductStock({
        sku: selectedProduct.sku,
        quantityChange: qtyChange,
      })
    );
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      } relative pb-6 w-full overflow-x-hidden min-h-screen`}
    >
      <DashboardHeader
        title="Inventory Management"
        description="Monitor and adjust product stock levels"
      />

      {/* Filter Buttons */}
      <div className="flex ml-8 mt-6 gap-4  border-gray-400 pb-1">
        {[
          { key: "all", label: "All Products" },
          { key: "low", label: "Low Stock" },
          { key: "out", label: "Out of Stock" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 cursor-pointer ${
              filter === tab.key
                ? darkMode
                  ? " border-white font-semibold"
                  : " border-black font-semibold"
                : darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div
        className={`
          m-6 p-5 rounded-xl shadow overflow-x-auto 
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
        `}
      >
        <table className="min-w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className={darkMode ? "bg-gray-900" : "bg-gray-100"}>
              {[
                "Product",
                "SKU",
                "Category",
                "Current Stock",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className={`text-left border-b pt-3 pb-3 px-4
                  ${darkMode ? "border-gray-700" : "border-gray-300"}
                `}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className={` py-4 text-center ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const status =
                  Number(product.stock) === 0
                    ? "Out of Stock"
                    : Number(product.stock) <= 10
                    ? "Low Stock"
                    : "In Stock";

                return (
                  <tr key={product.sku}>
                    <td className="px-4 py-4">{product.name}</td>
                    <td className="px-4 py-4">{product.sku}</td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">{product.stock}</td>

                    <td
                      className={`px-6 py-4 font-semibold ${
                        status === "Out of Stock"
                          ? "text-red-500"
                          : status === "Low Stock"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {status}
                    </td>

                    <td className="px-6 py-4 flex gap-3">
                      <CiEdit
                        size={22}
                        className={
                          darkMode
                            ? "text-blue-400 cursor-pointer"
                            : "text-blue-600 cursor-pointer"
                        }
                        onClick={() => handleStockUpdate(product, false)}
                      />
                      <MdDeleteOutline
                        size={22}
                        className={
                          darkMode
                            ? "text-red-400 cursor-pointer"
                            : "text-red-500 cursor-pointer"
                        }
                        onClick={() => handleStockUpdate(product, true)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Stock Modal */}
      {selectedProduct && (
        <StockModal
          open={modalOpen}
          setOpen={setModalOpen}
          product={selectedProduct}
          onUpdateStock={onUpdateStock}
          isRemove={isRemove}
        />
      )}
    </div>
  );
};

export default Inventory;
