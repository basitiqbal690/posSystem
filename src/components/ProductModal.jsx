import React from "react";

const ProductModal = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddProduct,
  handleUpdateProduct,
}) => {
  if (!openModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setFormData({
      ...formData,
      image: imageURL,
      imageFile: file,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Update Product" : "Add New Product"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 border rounded"
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
            className="p-2 border rounded"
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            className="p-2 border rounded"
          />

          <input
            name="barcode"
            placeholder="Barcode"
            value={formData.barcode}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />

          {/* File Upload */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium mb-1">Upload Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="p-2 border rounded"
            />
          </div>

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="col-span-2 w-24 h-24 object-cover rounded mx-auto mt-2"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          {isEditing ? (
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddProduct}
              className="bg-black text-white px-4 py-2 rounded"
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
