import React from "react";
import CategoryRow from "./CategoryRow";
import { useSelector } from "react-redux";

const CategoryTable = ({
  categoryList,
  openEditModal,
  removeCategory,
  listName,
}) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white"
      } m-6 p-6 rounded-2xl shadow-lg`}
    >
      <h2 className="text-2xl font-semibold mb-6">{listName}</h2>

      {categoryList.length === 0 ? (
        <p
          className={`${
            darkMode ? "text-gray-400" : "text-gray-400"
          } text-lg text-center py-10`}
        >
          No categories added yet...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr
                className={`text-left border-b 
                  ${darkMode ? "border-gray-700" : "border-gray-300"}
                `}
              >
                <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wider text-center">
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
