import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const CategoryRow = ({ item, openEditModal, removeCategory }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category "${item.name}"?`
    );
    if (confirmDelete) {
      removeCategory(item.sku); // only delete if confirmed
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 text-gray-700">
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.Description}</td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-3">
          <CiEdit
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className="text-red-500 cursor-pointer hover:text-red-700 transition"
            size={22}
            onClick={handleDelete} // call confirmation
          />
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
