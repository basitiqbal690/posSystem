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

  return (
    <div className="bg-gray-200 ">
      <div className=" pl-7 pt-7 bg-white rounded-2xl flex justify-between items-center p-5 shadow">
        <div>
          <h1 className="font-semibold text-xl">Users</h1>
          <p className="text-gray-500 text-xl">Manage your users list</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-black text-white px-6 py-4 rounded-xl hover:scale-95 transition cursor-pointer"
        >
          + Add User
        </button>
      </div>

      <UserTable
        userList={userList}
        openEditModal={openEditModal}
        removeUser={(sku) => dispatch(removeUser(sku))}
        listName="User List"
      />

      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        handleAddUser={handleAddUser}
        handleUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UserInfo;
