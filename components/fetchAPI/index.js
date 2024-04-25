import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAbout,
  fetchBanner,
  fetchCampaign,
  fetchCategory,
  fetchCategoryDetail,
  fetchHashTags,
  fetchNotification,
  fetchProduct,
  fetchServices,
  fetchVoucher,
} from "../../redux/reducers";
import {
  changeTheme,
  saveCategory,
  saveProducts,
  saveVoucher,
  setUser,
} from "../../redux/reducers/common";
import moment from "moment";
import { getLocal, setLocal } from "../../helpers/Local";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../pages/firebase-config";
import { get_current_user } from "../../apis/apiServices";

export default function FetchAPI() {
  const dispatch = useDispatch();
  const productsAPI = useSelector((state) => state?.api?.productsAPI);
  const categoryAPI = useSelector((state) => state?.api?.categoryAPI);
  const detailAPI = useSelector((state) => state?.api?.detailAPI);
  const campaignAPI = useSelector((state) => state?.api?.campaignsAPI);
  const voucherAPI = useSelector((state) => state?.api?.voucherAPI);

  const theme = getLocal("theme");

  const getUserCurrent = async (uid) => {
    const userCurrent = await get_current_user(uid);
    dispatch(setUser(userCurrent));
  };

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user?.uid;
        getUserCurrent(uid);
        setLocal("isLogin", true);
      } else {
        setLocal("isLogin", false);
        dispatch(setUser(null));
      }
    });
  };

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
    dispatch(fetchNotification());
    dispatch(fetchHashTags());
    // local store
    dispatch(changeTheme(theme));
    checkUser();
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
      //
      if (item?.campaign_id) {
        saleProduct = (campaignActive || [])?.find(
          (r) => r?.id === item?.campaign_id
        );
      } else if (!saleProduct) {
        saleDetail = (campaignActive || [])?.find(
          (r) => r?.category_detail_id === item?.category_detail_id
        );
      } else if (!saleDetail) {
        saleCategory = (campaignActive || [])?.find(
          (e) => !e?.category_detail_id && e?.category_id === item?.category_id
        );
      }
      //
      if (saleProduct && saleProduct?.sale > 0) {
        return {
          ...item,
          sale: saleProduct?.sale,
          end_date: `${saleProduct?.end_day} ${saleProduct?.end_hour}`,
        };
      } else if (saleDetail && saleDetail?.sale > 0) {
        return {
          ...item,
          sale: saleDetail?.sale,
          end_date: `${saleDetail?.end_day} ${saleDetail?.end_hour}`,
        };
      } else if (saleCategory && saleCategory?.sale > 0) {
        return {
          ...item,
          sale: saleCategory?.sale,
          end_date: `${saleCategory?.end_day} ${saleCategory?.end_hour}`,
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

  useEffect(() => {
    if (voucherAPI) {
      const voucherActive = (voucherAPI || []).filter((v) => {
        const isStart = moment().isAfter(
          moment(`${v?.start_day} ${v?.start_hour}`, "DD/MM/YYYY hh:mm")
        );
        const isEnd = moment().isAfter(
          moment(`${v?.end_day} ${v?.end_hour}`, "DD/MM/YYYY hh:mm")
        );
        return v.status && isStart && !isEnd;
      });
      dispatch(saveVoucher(voucherActive));
    }
  }, [voucherAPI]);

  return null;
}
