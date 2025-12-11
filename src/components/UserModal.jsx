import React from "react";
import { useSelector } from "react-redux";

const UserModal = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddUser,
  handleUpdateUser,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Get theme from Redux

  if (!openModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass = `col-span-2 p-2 border rounded w-full ${
    darkMode
      ? "bg-gray-700 border-gray-500 text-black"
      : "bg-white border-gray-300 text-black"
  }`;

  const selectClass = `p-2 border rounded w-full ${
    darkMode
      ? "bg-gray-700 border-gray-500 text-black"
      : "bg-white border-gray-300 text-black"
  }`;

  const modalBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className={`w-[450px] p-6 rounded-xl shadow-xl ${modalBg}`}>
        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEditing ? "Update User" : "Add New User"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="sku"
            placeholder="User SKU"
            value={formData.sku}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Cashier">Cashier</option>
            <option value="Manager">Manager</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
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
              onClick={handleUpdateUser}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddUser}
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

export default UserModal;
