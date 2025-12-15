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
      className={`
        m-4 sm:m-6 p-4 sm:p-6 rounded-2xl shadow-lg 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}
      `}
    >
      {/* Title */}
      <h2 className="lg:text-xl sm:text-lg font-semibold mb-4 sm:mb-6">
        {listName}
      </h2>

      {/* No categories */}
      {categoryList.length === 0 ? (
        <p
          className={`${
            darkMode ? "text-gray-300" : "text-gray-500"
          } text-lg text-center py-10`}
        >
          No categories added yet...
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
                <th
                  className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                >
                  Name
                </th>
                <th
                  className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                >
                  Description
                </th>
                <th
                  className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase text-center
                    ${darkMode ? "text-white" : "text-black"}
                  `}
                >
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
