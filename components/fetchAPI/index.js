import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  changeTheme,
  saveCategory,
  saveProducts,
} from "../../redux/reducers/common";
import moment from "moment";
import { getLocal } from "../../helpers/Local";

export default function FetchAPI() {
  const dispatch = useDispatch();
  const productsAPI = useSelector((state) => state?.api?.productsAPI);
  const categoryAPI = useSelector((state) => state?.api?.categoryAPI);
  const detailAPI = useSelector((state) => state?.api?.detailAPI);
  const campaignAPI = useSelector((state) => state?.api?.campaignsAPI);
  const theme = getLocal("theme");

  useEffect(() => {
    // api
    dispatch(fetchProduct());
    dispatch(fetchCategory());
    dispatch(fetchCategoryDetail());
    dispatch(fetchCampaign());
    dispatch(fetchVoucher());
    dispatch(fetchServices());
    dispatch(fetchAbout());
    dispatch(fetchBanner());
    // local store
    dispatch(changeTheme(theme));
  }, []);

  const mixDataProducts = () => {
    const productsActive = (productsAPI || []).filter((r) => r?.status);
    const campaignActive = (campaignAPI || []).filter((v) => {
      const isStart = moment().isAfter(
        moment(`${v?.start_day} ${v?.start_hour}`, "DD/MM/YYYY hh:mm")
      );
      const isEnd = moment().isAfter(
        moment(`${v?.end_day} ${v?.end_hour}`, "DD/MM/YYYY hh:mm")
      );
      return v.status && isStart && !isEnd;
    });
    const mixData = (productsActive || []).map((item) => {
      let saleProduct = null;
      let saleDetail = null;
      let saleCategory = null;

      if (item?.campaign_id) {
        saleProduct = (campaignActive || [])?.find(
          (r) => r?.id === item?.campaign_id
        )?.sale;
      } else if (!saleProduct) {
        saleDetail = (campaignActive || [])?.find(
          (r) => r?.category_detail_id === item?.category_detail_id
        )?.sale;
      } else if (!saleDetail) {
        saleCategory = (campaignActive || [])?.find(
          (e) => !e?.category_detail_id && e?.category_id === item?.category_id
        )?.sale;
      }

      if (saleProduct && saleProduct > 0) {
        return {
          ...item,
          sale: saleProduct,
        };
      } else if (saleDetail && saleDetail > 0) {
        return {
          ...item,
          sale: saleDetail,
        };
      } else if (saleCategory && saleCategory > 0) {
        return {
          ...item,
          sale: saleCategory,
        };
      } else {
        return item;
      }
    });

    return mixData;
  };

  useEffect(() => {
    if (productsAPI) {
      const dataProducts = mixDataProducts();
      dispatch(saveProducts(dataProducts));
    }
  }, [productsAPI, campaignAPI]);

  useEffect(() => {
    if (categoryAPI) {
      const categoryActive = (categoryAPI || []).filter((r) => r?.status);
      dispatch(saveCategory(categoryActive));
    }
  }, [categoryAPI]);

  return null;
}
