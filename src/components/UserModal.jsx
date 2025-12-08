import React from "react";

const UserModal = ({
  openModal,
  setOpenModal,
  isEditing,
  formData,
  setFormData,
  handleAddUser,
  handleUpdateUser,
}) => {
  if (!openModal) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEditing ? "Update User" : "Add New User"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="sku"
            placeholder="User SKU"
            value={formData.sku}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="col-span-2 p-2 border rounded"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="col-span-1 p-2 border rounded"
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
            className="col-span-1 p-2 border rounded"
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpenModal(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>

          {isEditing ? (
            <button
              onClick={handleUpdateUser}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddUser}
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

export default UserModal;
