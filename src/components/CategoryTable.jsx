import React from "react";
import CategoryRow from "./CategoryRow";

const CategoryTable = ({
  categoryList,
  openEditModal,
  removeCategory,
  listName,
}) => {
  return (
    <div className="m-6 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">{listName}</h2>

      {categoryList.length === 0 ? (
        <p className="text-gray-400 text-lg text-center py-10">
          No categories added yet...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 rounded-t-2xl">
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categoryList.map((item) => (
                <CategoryRow
                  key={item.sku}
                  item={item}
                  openEditModal={openEditModal}
                  removeCategory={removeCategory}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
