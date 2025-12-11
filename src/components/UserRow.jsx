import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const UserRow = ({ item, openEditModal, removeUser }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleDelete = () => {
    if (window.confirm(`Delete user "${item.name}"?`)) {
      removeUser(item.sku);
    }
  };

  const rowClass = ` ${darkMode ? "text-gray-200 " : "text-gray-700"}`;

  const editClass = `cursor-pointer  ${
    darkMode
      ? "text-blue-400 hover:text-blue-300"
      : "text-blue-600 hover:text-blue-800"
  }`;

  const deleteClass = `cursor-pointer  ${
    darkMode
      ? "text-red-400 hover:text-red-300"
      : "text-red-500 hover:text-red-700"
  }`;

  return (
    <tr className={rowClass}>
      <td className="px-6 py-4">{item.sku}</td>
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.email}</td>
      <td className="px-6 py-4">{item.role}</td>
      <td className="px-6 py-4">{item.status}</td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-3">
          <CiEdit
            className={editClass}
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className={deleteClass}
            size={22}
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
