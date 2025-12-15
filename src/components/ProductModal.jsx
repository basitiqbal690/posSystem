import React from "react";
import { useSelector } from "react-redux";

const ProductModal = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddProduct,
  handleUpdateProduct,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (!openModal) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setFormData({ ...formData, image: imageURL, imageFile: file });
  };

  const modalBgClass = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-black";

  const modalBgplaceholderClass = darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black border border-gray-300 placeholder-gray-700";

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div
        className={`lg:w-[90vw] sm:w-[60vw] md:w-[40vw] max-w-3xl  lg:p-6  sm:p-3 rounded-2xl shadow-2xl ${modalBgClass} overflow-y-auto`}
      >
        {/* Header */}
        <h2 className="lg:text-2xl sm:text-xl font-bold mb-5 text-center">
          {isEditing ? "Update Product" : "Add New Product"}
        </h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className={
              modalBgplaceholderClass + " col-span-2 lg:p-3 sm:p-2 rounded-xl"
            }
          />
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={
              modalBgplaceholderClass + " col-span-2 lg:p-3 sm:p-2 rounded-xl"
            }
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={
              modalBgplaceholderClass + " col-span-2 lg:p-3 sm:p-2 rounded-xl"
            }
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Appliances">Appliances</option>
            <option value="Fitness">Fitness</option>
            <option value="Home">Home</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={modalBgplaceholderClass + " lg:p-3 sm:p-2 rounded-xl"}
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className={modalBgplaceholderClass + " lg:p-3 sm:p-2 rounded-xl"}
          />
          <input
            name="barcode"
            placeholder="Barcode"
            value={formData.barcode}
            onChange={handleChange}
            className={
              modalBgplaceholderClass + " col-span-2 lg:p-3 sm:p-2 rounded-xl"
            }
          />

          {/* Image Upload */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-2">Upload Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={
                modalBgplaceholderClass +
                " col-span-2 lg:p-3 sm:p-1 rounded-xl cursor-pointer"
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
          >
            Cancel
          </button>
          {isEditing ? (
            <button
              onClick={handleUpdateProduct}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
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

export default ProductModal;
