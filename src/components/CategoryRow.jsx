import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const CategoryRow = ({ item, openEditModal, removeCategory }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category "${item.name}"?`
    );
    if (confirmDelete) {
      removeCategory(item.sku);
    }
  };

  return (
    <tr
      className={`${
        darkMode
          ? "hover:bg-gray-700 text-white"
          : "hover:bg-gray-50 text-gray-700"
      }`}
    >
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.Description}</td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-3">
          <CiEdit
            className={`${
              darkMode
                ? "text-blue-300 hover:text-blue-100"
                : "text-blue-600 hover:text-blue-800"
            } cursor-pointer`}
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className={`${
              darkMode
                ? "text-red-300 hover:text-red-100"
                : "text-red-500 hover:text-red-700"
            } cursor-pointer`}
            size={22}
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;
