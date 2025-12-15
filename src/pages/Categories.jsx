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
  const darkMode = useSelector((state) => state.theme.darkMode);
  const categoryList = useSelector((state) => state.categoriesAdd.categories);

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
      sku: Date.now().toString(),
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
  };

  const handleUpdateCategory = () => {
    dispatch(updateCategoryInCart({ originalSKU, updatedData: formData }));
    setOpenModal(false);
  };

  const handleDeleteCategory = (sku) => {
    dispatch(removeCategoryFromCart(sku));
  };

  return (
    <div
      className={`relative pb-6 w-full overflow-x-hidden min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      } `}
    >
      <div className="mt-5 pl-7 pt-7 ">
        <h1 className="font-semibold lg:text-2xl sm:text-lg">
          Category Management
        </h1>
        <p
          className={` lg:text-xl sm:text-xs ${
            darkMode ? "text-gray-300" : "text-gray-500"
          } text-xl`}
        >
          Create and manage categories
        </p>
      </div>

      <div
        className={`${
          darkMode ? "bg-gray-900" : "bg-white"
        } lg:m-6 sm:m-3 p-5 rounded-xl flex justify-between shadow sm:ml-6 sm:mr-6 `}
      >
        <div>
          <h1 className="font-semibold lg:text-xl sm:text-lg">
            Category Management
          </h1>
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-500"
            } lg:text-xl sm:text-xs`}
          >
            Create and manage categories
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-gray-800 text-white lg:px-6 lg:py-4 sm:px-3 sm:py-1 rounded-xl hover:scale-95 transition cursor-pointer"
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
