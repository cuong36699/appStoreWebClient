import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  status: null,
  error: null,
  loading: false,
};

export const common = createSlice({
  name: "counter",
  initialState,
  reducers: {
    saveProduct: (state, action) => {
      const product = action?.payload;
      state.product = product;
    },
  },
});

export const { saveProduct } = common.actions;

export default common.reducer;
