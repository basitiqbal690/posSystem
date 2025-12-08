// store/slice/AddProductSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const AddProductSlice = createSlice({
  name: "productsAdd",
  initialState,
  reducers: {
    addProductsToCart: (state, action) => {
      const newProduct = action.payload;
      const exists = state.products.some((item) => item.sku === newProduct.sku);
      if (!exists) {
        state.products.push(newProduct);
      }
    },
    updateProductInCart: (state, action) => {
      const { originalSKU, updatedData } = action.payload;
      const index = state.products.findIndex((item) => item.sku === originalSKU);
      if (index !== -1) {
        state.products[index] = updatedData;
      }
    },
    removeProductsFromCart: (state, action) => {
      const skuToRemove = action.payload;
      state.products = state.products.filter((item) => item.sku !== skuToRemove);
    },
    updateProductStock: (state, action) => {
      const { sku, quantityChange } = action.payload; // positive to add, negative to remove
      const index = state.products.findIndex((item) => item.sku === sku);
      if (index !== -1) {
        state.products[index].stock = Number(state.products[index].stock) + Number(quantityChange);
      }
    },
  },
});

export const { addProductsToCart, updateProductInCart, removeProductsFromCart, updateProductStock } =
  AddProductSlice.actions;

export default AddProductSlice.reducer;
