import React from "react";
import ProductRow from "./ProductRow";

const ProductTable = ({
  productList,
  openEditModal,
  removeProduct,
  listName,
}) => {
  return (
    <div className="m-6 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">{listName}</h2>

      {productList.length === 0 ? (
        <p className="text-gray-400 text-lg text-center py-10">
          No products added yet...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 rounded-t-2xl">
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Barcode
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {productList.map((item) => (
                <ProductRow
                  key={item.sku} // Keep functionality intact
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
