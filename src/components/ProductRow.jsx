import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const ProductRow = ({ item, openEditModal, removeProduct }) => {
  let handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the product "${item.name}"?`
    );

    if (confirmDelete) {
      removeProduct(item.sku);
    }
  };
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 text-gray-700">
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
            className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
            size={22}
            onClick={() => openEditModal(item)}
          />
          <MdDeleteOutline
            className="text-red-500 cursor-pointer hover:text-red-700 transition"
            size={22}
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
