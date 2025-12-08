// NOTE: remove all `id` references
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

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSKU, setOriginalSKU] = useState(""); // NEW

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
    setOriginalSKU(item.sku); // store the SKU of the product being edited
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
    <div className="bg-gray-200 min-h-screen">
      <div className="mt-5 pl-7 pt-7">
        <h1 className="font-semibold text-2xl">Product Management</h1>
        <p className="text-gray-500 text-xl">Add, Edit or Delete Products</p>
      </div>

      <div className="m-6 p-5 bg-white rounded-xl flex justify-between shadow">
        <div>
          <h1 className="font-semibold text-xl">Products</h1>
          <p className="text-gray-500 text-xl">Manage your product list</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-4 rounded-xl hover:scale-95 transition cursor-pointer"
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
