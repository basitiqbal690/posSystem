import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  removeCategoryFromCart,
  updateCategoryInCart,
} from "../store/slice/AddCategorySlice";

import CategoryModel from "../components/CategoryModel";
import CategoryTable from "../components/CategoryTable";

const Categories = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoriesAdd.categories); // fixed selector

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSKU, setOriginalSKU] = useState("");

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    Description: "",
  });

  const openAddModal = () => {
    setIsEditing(false);
    setOpenModal(true);
    setFormData({
      sku: Date.now().toString(), // generate unique SKU for category
      name: "",
      Description: "",
    });
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setOriginalSKU(item.sku);
    setFormData({ ...item });
    setOpenModal(true);
  };

  const handleAddCategory = () => {
    dispatch(addCategory(formData));
    setOpenModal(false);
    setFormData({
      sku: "",
      name: "",
      Description: "",
    });
  };

  const handleUpdateCategory = () => {
    dispatch(updateCategoryInCart({ originalSKU, updatedData: formData }));
    setOpenModal(false);
    setIsEditing(false);
    setOriginalSKU("");
  };

  const handleDeleteCategory = (sku) => {
    dispatch(removeCategoryFromCart(sku));
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mt-5 pl-7 pt-7">
        <h1 className="font-semibold text-2xl">Category Management</h1>
        <p className="text-gray-500 text-xl">Create and manage categories</p>
      </div>

      <div className="m-6 p-5 bg-white rounded-xl flex justify-between shadow">
        <div>
          <h1 className="font-semibold text-xl">Category Management</h1>
          <p className="text-gray-500 text-xl">Create and manage categories</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-4 rounded-xl hover:scale-95 transition cursor-pointer"
        >
          + Add Category
        </button>
      </div>

      <CategoryTable
        categoryList={categoryList}
        openEditModal={openEditModal}
        removeCategory={handleDeleteCategory}
        listName="Category List"
      />

      <CategoryModel
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleAddCategory={handleAddCategory}
        handleUpdateCategory={handleUpdateCategory}
      />
    </div>
  );
};

export default Categories;
