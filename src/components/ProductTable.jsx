import React from "react";
import ProductRow from "./ProductRow";
import { useSelector } from "react-redux";

const ProductTable = ({
  productList,
  openEditModal,
  removeProduct,
  listName,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`
        m-4 sm:m-6 p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-300
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        {listName}
      </h2>

      {/* No products */}
      {productList.length === 0 ? (
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-500"
          } text-lg text-center py-10`}
        >
          No products added yet...
        </p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-collapse">
            <thead>
              <tr
                className={`text-left border-b 
                  ${darkMode ? "border-gray-700" : "border-gray-300"}
                `}
              >
                {[
                  "SKU",
                  "Name",
                  "Category",
                  "Barcode",
                  "Price",
                  "Stock",
                  "Image",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase 
                      ${darkMode ? "text-white " : "text-black"}
                    `}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {productList.map((item) => (
                <ProductRow
                  key={item.sku}
                  item={item}
                  openEditModal={openEditModal}
                  removeProduct={removeProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
