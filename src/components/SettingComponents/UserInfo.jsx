import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  removeUser,
  updateUser,
} from "../../store/slice/AddUserSlice";

import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";

const UserInfo = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.User.users); // fixed selector
  const darkMode = useSelector((state) => state.theme.darkMode);

  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalSKU, setOriginalSKU] = useState("");

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const openAddModal = () => {
    setIsEditing(false);
    setOpenModal(true);
    setFormData({ sku: "", name: "", email: "", role: "", status: "" });
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setOriginalSKU(item.sku);
    setFormData({ ...item });
    setOpenModal(true);
  };

  const handleAddUser = () => {
    if (userList.some((user) => user.sku === formData.sku)) {
      alert("SKU already exists! Use a unique SKU.");
      return;
    }
    dispatch(addUser(formData));
    setOpenModal(false);
    setFormData({ sku: "", name: "", email: "", role: "", status: "" });
  };

  const handleUpdateUser = () => {
    dispatch(updateUser({ originalSKU, updatedData: formData }));
    setOpenModal(false);
    setIsEditing(false);
    setOriginalSKU("");
    setFormData({ sku: "", name: "", email: "", role: "", status: "" });
  };

  // Styling classes
  const containerBg = darkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-200 text-black";
  const cardBg = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
  const textGray = darkMode ? "text-gray-300" : "text-gray-500";
  const buttonBg = darkMode
    ? "bg-gray-800 hover:bg-gray-700"
    : "bg-black hover:bg-gray-800";

  return (
    <div className={`${containerBg} min-h-screen `}>
      <div
        className={`${cardBg} pl-7 pt-7 rounded-2xl flex justify-between items-center p-5 shadow mb-6 `}
      >
        <div>
          <h1 className="font-semibold text-xl">Users</h1>
          <p className={`${textGray} text-xl`}>Manage your users list</p>
        </div>

        <button
          onClick={openAddModal}
          className={`${buttonBg} text-white px-6 py-4 rounded-xl hover:scale-95 transition cursor-pointer`}
        >
          + Add User
        </button>
      </div>

      <UserTable
        userList={userList}
        openEditModal={openEditModal}
        removeUser={(sku) => dispatch(removeUser(sku))}
        listName="User List"
        darkMode={darkMode} // Pass down darkMode if your table supports it
      />

      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleAddUser={handleAddUser}
        handleUpdateUser={handleUpdateUser}
        darkMode={darkMode} // Pass down darkMode for modal styling
      />
    </div>
  );
};

export default UserInfo;
