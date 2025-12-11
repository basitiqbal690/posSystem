import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ProductRow = ({ item, openEditModal, removeProduct }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product "${item.name}"?`
    );

    if (confirmDelete) {
      removeProduct(item.sku);
    }
  };

  return (
    <tr
      className={`${darkMode ? " text-white" : "hover:bg-gray-50 text-black"}`}
    >
      <td className="px-6 py-4">{item.sku}</td>
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">{item.barcode}</td>
      <td className="px-6 py-4">pkr {item.price}</td>
      <td className="px-6 py-4">{item.stock}</td>
      <td className="px-6 py-4">
        <img
          src={item.image}
          className="w-16 h-16 object-cover rounded mx-auto"
          alt="Product"
        />
      </td>
      <td className="px-6 py-4 text-center">
        <div className="inline-flex items-center gap-3">
          <CiEdit
            className={`cursor-pointer transition ${
              darkMode
                ? "text-blue-400 hover:text-blue-200"
                : "text-blue-600 hover:text-blue-800"
            }`}
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className={`cursor-pointer transition ${
              darkMode
                ? "text-red-400 hover:text-red-200"
                : "text-red-500 hover:text-red-700"
            }`}
            size={22}
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
