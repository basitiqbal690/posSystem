// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/AddProductSlice";
import categoryReducer from "./slice/AddCategorySlice";
import userReducer from "./slice/AddUserSlice";
import cartReducer from "./slice/CartSlice";
import themeReducer from "./slice/ThemeSlice"; 

export const store = configureStore({
  reducer: {
    productsAdd: productReducer,
    categoriesAdd: categoryReducer,
    User: userReducer,
    cart: cartReducer,
    theme: themeReducer, 
  },
});
