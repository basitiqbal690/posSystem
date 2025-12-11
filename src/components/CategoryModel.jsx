import React from "react";
import { useSelector } from "react-redux";

const CategoryModel = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddCategory,
  handleUpdateCategory,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (!openModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const modalBgplaceholderClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black border border-gray-300 placeholder-gray-700";

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className={`${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } w-[500px] p-6 rounded-xl shadow-xl`}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Update Category" : "Add New Category"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Eg.. Electronics , Clothing, Food"
            value={formData.name}
            onChange={handleChange}
            className={modalBgplaceholderClass + " col-span-2 p-3 rounded-xl"}
          />

          <textarea
            name="Description"
            placeholder="Brief Description of this category"
            value={formData.Description}
            onChange={handleChange}
            rows={5}
            className={modalBgplaceholderClass + " col-span-2 p-3 rounded-xl"}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
          >
            Cancel
          </button>

          {isEditing ? (
            <button
              onClick={handleUpdateCategory}
              className="bg-green-600 hover:bg-green-700 cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddCategory}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryModel;
