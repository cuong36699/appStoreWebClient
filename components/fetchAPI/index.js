import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAbout,
  fetchBanner,
  fetchCampaign,
  fetchCategory,
  fetchCategoryDetail,
  fetchProduct,
  fetchServices,
  fetchVoucher,
} from "../../redux/reducers";

export default function FetchAPI() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchCategory());
    dispatch(fetchCategoryDetail());
    dispatch(fetchCampaign());
    dispatch(fetchVoucher());
    dispatch(fetchServices());
    dispatch(fetchAbout());
    dispatch(fetchBanner());
  }, []);

  return null;
}
