import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { useSelector, useDispatch } from "react-redux";
import StockModal from "../components/StockModal";
import { updateProductStock } from "../store/slice/AddProductSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const Inventory = () => {
  const dispatch = useDispatch();

  // Get products and categories from Redux
  const productList = useSelector((state) => state.productsAdd.products);

  const [filter, setFilter] = useState("all"); // all, low, out

  // Stock modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  // Filter products based on stock
  const filteredProducts = productList.filter((p) => {
    if (filter === "all") return true;
    if (filter === "low") return Number(p.stock) > 0 && Number(p.stock) <= 10;
    if (filter === "out") return Number(p.stock) === 0;
    return true;
  });

  // Open modal for add/remove stock
  const handleStockUpdate = (product, remove = false) => {
    setSelectedProduct(product);
    setIsRemove(remove);
    setModalOpen(true);
  };

  // Update stock
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
    <div className="bg-gray-200 min-h-screen">
      <DashboardHeader
        title="Inventory Management"
        description="Monitor and adjust product stock levels"
      />

      {/* Filter Buttons */}
      <div className="m-6 p-5 bg-white rounded-xl shadow flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`p-2 border rounded-2xl ${
            filter === "all" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setFilter("low")}
          className={`p-2 border rounded-2xl ${
            filter === "low" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Low Stock
        </button>
        <button
          onClick={() => setFilter("out")}
          className={`p-2 border rounded-2xl ${
            filter === "out" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Out of Stock
        </button>
      </div>

      {/* Inventory Table */}
      <div className="m-6 p-5 bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-gray-700 font-medium">Product</th>
              <th className="px-6 py-3 text-gray-700 font-medium">SKU</th>
              <th className="px-6 py-3 text-gray-700 font-medium">Category</th>
              <th className="px-6 py-3 text-gray-700 font-medium">
                Current Stock
              </th>
              <th className="px-6 py-3 text-gray-700 font-medium">Status</th>
              <th className="px-6 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
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
                  <tr
                    key={product.sku}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">{status}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <CiEdit
                        className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                        size={22}
                        onClick={() => handleStockUpdate(product, false)}
                      />
                      <MdDeleteOutline
                        className="text-red-500 cursor-pointer hover:text-red-700 transition"
                        size={22}
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
