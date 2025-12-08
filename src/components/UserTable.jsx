import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ userList, openEditModal, removeUser, listName }) => {
  return (
    <div className="m-6 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">{listName}</h2>

      {userList.length === 0 ? (
        <p className="text-gray-400 text-lg text-center py-10">
          No users added yet...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 rounded-t-2xl">
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
