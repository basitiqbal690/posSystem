import React from "react";
import UserRow from "./UserRow";

const UserTable = ({
  userList,
  openEditModal,
  removeUser,
  listName,
  darkMode,
}) => {
  const tableBg = darkMode ? "bg-gray-800 text-white" : "bg-white text-black";
  const headerBg = darkMode ? "" : "bg-gray-100";
  const textGray = darkMode ? "text-gray-300" : "text-gray-400";

  return (
    <div className={`mt-4 p-6 rounded-2xl shadow-lg ${tableBg}`}>
      <h2 className="text-2xl font-semibold mb-6">{listName}</h2>

      {userList.length === 0 ? (
        <p className={`${textGray} text-lg text-center py-10`}>
          No users added yet...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className={`${headerBg} rounded-t-2xl`}>
                <th className="px-6 py-3">SKU</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userList.map((item) => (
                <UserRow
                  key={item.sku}
                  item={item}
                  openEditModal={openEditModal}
                  removeUser={removeUser}
                  darkMode={darkMode} // Pass darkMode to each row
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
