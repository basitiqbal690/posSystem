import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const UserRow = ({ item, openEditModal, removeUser }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete user "${item.name}"?`)) {
      removeUser(item.sku);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition text-gray-700">
      <td className="px-6 py-4">{item.sku}</td>
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.role}</td>
      <td className="px-6 py-4">{item.status}</td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-3">
          <CiEdit
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className="text-red-500 cursor-pointer hover:text-red-700"
            size={22}
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
