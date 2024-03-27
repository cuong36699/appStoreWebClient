import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  get_about,
  get_banners,
  get_campaign,
  get_category,
  get_category_detail,
  get_products,
  get_services,
  get_voucher,
} from "../../apis/apiServices";

const initialState = {
  productsAPI: [],
  categoryAPI: [],
  detailAPI: [],
  campaignsAPI: [],
  voucherAPI: [],
  servicesAPI: [],
  aboutAPI: [],
  bannerAPI: [],
  status: null,
  error: null,
  loading: false,
};

export const fetchProduct = createAsyncThunk(
  "api/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_products();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "api/fetchCategory",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_category();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryDetail = createAsyncThunk(
  "api/fetchCategoryDetail",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_category_detail();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCampaign = createAsyncThunk(
  "api/fetchCampaign",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_campaign();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVoucher = createAsyncThunk(
  "api/fetchVoucher",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_voucher();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchServices = createAsyncThunk(
  "api/fetchServices",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_services();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAbout = createAsyncThunk(
  "api/fetchAbout",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_about();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBanner = createAsyncThunk(
  "api/fetchBanner",
  async (id, { rejectWithValue }) => {
    try {
      const data = await get_banners();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const api = createSlice({
  name: "api",
  initialState,
  extraReducers: (builder) => {
    builder
      // fetch product
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsAPI = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch category
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryAPI = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch category detail
      .addCase(fetchCategoryDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailAPI = action.payload;
      })
      .addCase(fetchCategoryDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch campaign
      .addCase(fetchCampaign.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampaign.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.campaignsAPI = action.payload;
      })
      .addCase(fetchCampaign.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch voucher
      .addCase(fetchVoucher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVoucher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.voucherAPI = action.payload;
      })
      .addCase(fetchVoucher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch services
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.servicesAPI = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch about
      .addCase(fetchAbout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutAPI = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch banner
      .addCase(fetchBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bannerAPI = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { getProducts } = api.actions;
export default api.reducer;
