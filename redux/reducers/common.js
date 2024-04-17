import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  category: [],
  theme: false,
  brand: { category: null, detail: null },
  user: null,
  billDetail: {},
  listCard: 0,
  voucher: [],
  toasterGlobal: {
    active: false,
    mess: "",
    status: "",
  },
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
    setUser: (state, action) => {
      const user = action?.payload;
      state.user = user;
    },
    setBillDetail: (state, action) => {
      const billDetail = action?.payload;
      state.billDetail = billDetail;
    },
    saveVoucher: (state, action) => {
      const voucher = action?.payload;
      state.voucher = voucher;
    },
    setToasterGlobal: (state, action) => {
      const toasterGlobal = action?.payload || {
        status: false,
        des: "",
        mess: "",
      };
      state.toasterGlobal = toasterGlobal;
    },
  },
});

export const {
  saveProducts,
  saveCategory,
  changeTheme,
  changeBrand,
  setUser,
  setBillDetail,
  saveVoucher,
  setToasterGlobal,
} = common.actions;

export default common.reducer;
