import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // store all users here
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add a new user
    addUser: (state, action) => {
      const newUser = action.payload;
      const exists = state.users.some((user) => user.sku === newUser.sku);
      if (!exists) {
        state.users.push(newUser);
      }
    },

    // Update an existing user by original SKU
    updateUser: (state, action) => {
      const { originalSKU, updatedData } = action.payload;
      const index = state.users.findIndex((user) => user.sku === originalSKU);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedData };
      }
    },

    // Remove a user by SKU
    removeUser: (state, action) => {
      const skuToRemove = action.payload;
      state.users = state.users.filter((user) => user.sku !== skuToRemove);
    },

    // Optional: reset all users
    resetUsers: (state) => {
      state.users = [];
    },
  },
});

// Export actions
export const { addUser, updateUser, removeUser, resetUsers } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
