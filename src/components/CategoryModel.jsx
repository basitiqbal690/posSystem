import React from "react";

const CategoryModel = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddCategory,
  handleUpdateCategory,
}) => {
  if (!openModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Update Category" : "Add New Category"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Eg.. Electronics , Clothing, Food"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-[33vw] text-sm"
          />
          <br />
          <textarea
            name="Description"
            placeholder="Brief Description of this category"
            value={formData.Description} // fixed binding to Description
            onChange={handleChange}
            rows={5}
            className="p-2 border rounded w-[33vw]"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 px-4 py-2 rounded cursor-pointer hover:scale-103"
          >
            Cancel
          </button>

          {isEditing ? (
            <button
              onClick={handleUpdateCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:scale-103"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddCategory}
              className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:scale-103"
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
