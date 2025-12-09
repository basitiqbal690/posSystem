import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  taxRate: 10, // 10% tax
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.cartItems.find(
        (item) => item.sku === product.sku
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const sku = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.sku !== sku);
    },

    increaseQty: (state, action) => {
      const sku = action.payload;
      const item = state.cartItems.find((item) => item.sku === sku);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const sku = action.payload;
      const item = state.cartItems.find((item) => item.sku === sku);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
