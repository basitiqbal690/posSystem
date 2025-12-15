import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductsToCart,
  removeProductsFromCart,
  updateProductInCart,
} from "../store/slice/AddProductSlice";

import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productsAdd.products);
  const darkMode = useSelector((state) => state.theme.darkMode); // DARK MODE

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSKU, setOriginalSKU] = useState("");

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    barcode: "",
    price: "",
    stock: "",
    image: "",
    imageFile: null,
  });

  const openAddModal = () => {
    setIsEditing(false);
    setOpenModal(true);
    setFormData({
      sku: "",
      name: "",
      category: "",
      barcode: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setOriginalSKU(item.sku);
    setFormData({ ...item });
    setOpenModal(true);
  };

  const handleAddProduct = () => {
    const exists = productList.some((item) => item.sku === formData.sku);
    if (exists) {
      alert("SKU already exists! Use a unique SKU.");
      return;
    }

    dispatch(addProductsToCart(formData));
    setOpenModal(false);
    setFormData({
      sku: "",
      name: "",
      category: "",
      barcode: "",
      price: "",
      stock: "",
      image: "",
    });
  };

  const handleUpdateProduct = () => {
    dispatch(updateProductInCart({ originalSKU, updatedData: formData }));
    setOpenModal(false);
    setIsEditing(false);
    setOriginalSKU("");
  };

  return (
    <div
      className={`relative pb-6 w-full overflow-x-hidden min-h-screen   ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="mt-5 pl-7 pt-7">
        <h1 className="font-semibold lg:text-2xl sm:text-xl">
          Product Management
        </h1>
        <p className="text-gray-500 lg:text-xl sm:text-sm">
          Add, Edit or Delete Products
        </p>
      </div>

      <div
        className={`lg:m-6 sm:m-3 p-5 sm:ml-6 sm:mr-6 rounded-xl flex justify-between shadow ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div>
          <h1 className="font-semibold lg:text-xl sm:text-lg">Products</h1>
          <p className="text-gray-500 lg:text-xl sm:text-lg">
            Manage your product list
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gray-800 text-white lg:px-6 lg:py-4 sm:px-4 sm:py-1 rounded-xl hover:scale-95 transition cursor-pointer"
        >
          + Add Product
        </button>
      </div>

      <ProductTable
        productList={productList}
        openEditModal={openEditModal}
        removeProduct={(sku) => dispatch(removeProductsFromCart(sku))}
        listName="Product List"
      />

      <ProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default Products;
