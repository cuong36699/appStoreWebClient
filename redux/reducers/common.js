import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: [],
  theme: false,
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
  },
});

export const { saveProducts, saveCategory, changeTheme } = common.actions;

export default common.reducer;
