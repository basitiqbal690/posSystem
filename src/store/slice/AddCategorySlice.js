import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const AddCategorySlice = createSlice({
  name: "categoryAdd",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const newCategory = action.payload;
      const exists = state.categories.some((item) => item.sku === newCategory.sku);
      if (!exists) {
        state.categories.push(newCategory);
      }
    },
    updateCategoryInCart: (state, action) => {
      const { originalSKU, updatedData } = action.payload;
      const index = state.categories.findIndex((item) => item.sku === originalSKU);
      if (index !== -1) {
        state.categories[index] = updatedData;
      }
    },
    removeCategoryFromCart: (state, action) => {
      const skuToRemove = action.payload;
      state.categories = state.categories.filter((item) => item.sku !== skuToRemove);
    },
  },
});

export const { addCategory, updateCategoryInCart, removeCategoryFromCart } = AddCategorySlice.actions;

export default AddCategorySlice.reducer;
