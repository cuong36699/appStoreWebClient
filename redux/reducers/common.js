import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: [],
  theme: false,
  brand: { category: null, detail: null },
  userID: null,
  billDetail: {},
  listCard: 0,
};

export const common = createSlice({
  name: "common",
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
    setID: (state, action) => {
      const userID = action?.payload;
      state.userID = userID;
    },
    setBillDetail: (state, action) => {
      const billDetail = action?.payload;
      state.billDetail = billDetail;
    },
  },
});

export const {
  saveProducts,
  saveCategory,
  changeTheme,
  changeBrand,
  setID,
  setBillDetail,
} = common.actions;

export default common.reducer;
