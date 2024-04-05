import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: [],
  theme: false,
  brand: { category: null, detail: null },
};

export const common = createSlice({
  name: "counter",
  initialState,
  reducers: {
    saveProducts: (state, action) => {
      const products = action?.payload;
      state.products = products;
    },
    saveCategory: (state, action) => {
      const category = action?.payload;
      state.category = category;
    },
    changeTheme: (state, action) => {
      const theme = action?.payload;
      state.theme = theme;
    },
    changeBrand: (state, action) => {
      const brand = action?.payload;
      state.brand = brand;
    },
  },
});

export const { saveProducts, saveCategory, changeTheme, changeBrand } =
  common.actions;

export default common.reducer;
