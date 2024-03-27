"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Media, Row } from "reactstrap";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart/index";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";
import PostLoader from "../PostLoader";
import ProductItem from "../product-box/ProductBox1";

const TabContent = ({
  data,
  loading,
  startIndex,
  endIndex,
  cartClass,
  backImage,
}) => {
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  return (
    <Row className="no-slider">
      {!data || data.length === 0 || loading ? (
        data && data.length === 0 ? (
          <Col xs="12">
            <div>
              <div className="col-sm-12 empty-cart-cls text-center">
                <Media
                  src={emptySearch}
                  className="img-fluid mb-4 mx-auto"
                  alt=""
                />
                <h3>
                  <strong>Your Cart is Empty</strong>
                </h3>
                <h4>Explore more shortlist some items.</h4>
              </div>
            </div>
          </Col>
        ) : (
          <div className="row mx-0 margin-default">
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
            <div className="col-xl-3 col-lg-4 col-6">
              <PostLoader />
            </div>
          </div>
        )
      ) : (
        data &&
        data
          .slice(startIndex, endIndex)
          .map((product, i) => (
            <ProductItem
              key={i}
              product={product}
              symbol={currency.symbol}
              addCompare={() => compareContext.addToCompare(product)}
              addCart={() => context.addToCart(product, quantity)}
              addWishlist={() => wishListContext.addToWish(product)}
              cartClass={cartClass}
              backImage={backImage}
            />
          ))
      )}
    </Row>
  );
};

const SpecialProducts = ({
  type,
  fluid,
  designClass,
  cartClass,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrClass,
  backImage,
  filter,
}) => {
  const context = useContext(CartContext);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataRaw, setDataRaw] = useState([]);

  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  const productsAPI = useSelector((state) => state?.api?.productsAPI);
  const categoryAPI = useSelector((state) => state?.api?.categoryAPI);
  const detailAPI = useSelector((state) => state?.api?.detailAPI);
  const campaignAPI = useSelector((state) => state?.api?.campaignAPI);
  const statusAPI = useSelector((state) => state?.api?.status);

  useEffect(() => {
    if (statusAPI === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [statusAPI]);

  const handleClickTab = (id) => {
    if (!id) {
      setData(dataRaw || []);
    } else {
      const dataNew = (dataRaw || [])?.filter((r) => r?.category_id === id);
      setData(dataNew || []);
    }
    //  else if (type === "filter") {
    //   const { type, id, value } = filter;
    //   if (type === "search" && value !== "") {
    //     const getFilterSearch = (productsAPI || []).filter(
    //       (r) =>
    //         r?.name && (r?.name).toLowerCase().includes(value.toLowerCase())
    //     );
    //     setData(getFilterSearch);
    //   } else {
    //     const getFilter = (productsAPI || []).filter(
    //       (r) => r?.[`${type}_id`] === id
    //     );
    //     setData(getFilter || []);
    //   }
    // }
  };

  useEffect(() => {
    if (productsAPI) {
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
            (e) =>
              !e?.category_detail_id && e?.category_id === item?.category_id
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
      setDataRaw(mixData);
      setData(mixData);
    }
    if (categoryAPI) {
      const categoryActive = (categoryAPI || []).filter((r) => r?.status);
      setDataCategory(categoryActive);
    }
  }, [productsAPI, campaignAPI, categoryAPI, detailAPI]);

  // const getData = async (id = "all", type) => {

  //   //
  //   const detailAPI = await get_category_detail();
  //   //
  //   const campaignAPI = await get_campaign();
  //   const mixDataCampaign = (campaignAPI || []).filter((v) => {
  //     const checkExp = moment().isAfter(
  //       moment(`${v?.end_day} ${v?.end_hour}`, "DD/MM/YYYY hh:mm")
  //     );
  //     return v.status && !checkExp;
  //   });
  //   //
  //   const mixDataProducts = (checkProductsStatus || []).map((item, index) => {
  //     let findProductCampaign = null;
  //     let findDetailCampaign = null;
  //     let findCategoryCampaign = null;

  //     if (item?.campaign_id) {
  //       findProductCampaign = (mixDataCampaign || [])?.find(
  //         (r) => r?.id === item?.campaign_id
  //       )?.sale;
  //     } else if (!findProductCampaign) {
  //       findDetailCampaign = (mixDataCampaign || [])?.find(
  //         (r) => r?.category_detail_id === item?.category_detail_id
  //       )?.sale;
  //     } else if (!findDetailCampaign) {
  //       console.log("first");
  //       findCategoryCampaign = (mixDataCampaign || [])?.find(
  //         (e) => !e?.category_detail_id && e?.category_id === item?.category_id
  //       )?.sale;
  //     }

  //     if (findProductCampaign && findProductCampaign > 0) {
  //       return {
  //         ...item,
  //         sale: findProductCampaign,
  //       };
  //     } else if (findDetailCampaign && findDetailCampaign > 0) {
  //       return {
  //         ...item,
  //         sale: findDetailCampaign,
  //       };
  //     } else if (findCategoryCampaign && findCategoryCampaign > 0) {
  //       return {
  //         ...item,
  //         sale: findCategoryCampaign,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });

  //   // show data theo yeu cau
  //   if (type === "product") {
  //     if (id === "all") {
  //       setData(mixDataProducts || []);
  //     } else {
  //       const dataActive = (mixDataProducts || [])?.filter(
  //         (r) => r?.category_id === id && r?.status
  //       );
  //       setData(dataActive || []);
  //     }
  //   } else if (type === "filter") {
  //     const { type, id, value } = filter;
  //     if (type === "search" && value !== "") {
  //       const getFilterSearch = (productsAPI || []).filter(
  //         (r) =>
  //           r?.name && (r?.name).toLowerCase().includes(value.toLowerCase())
  //       );
  //       setData(getFilterSearch);
  //     } else {
  //       const getFilter = (productsAPI || []).filter(
  //         (r) => r?.[`${type}_id`] === id
  //       );
  //       setData(getFilter || []);
  //     }
  //   }
  // };

  return (
    <div>
      <section className={designClass}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              {/* <h4>exclusive products</h4> */}
              <h2 className={inner}>sản phẩm</h2>
              {line ? (
                <div className="line"></div>
              ) : hrClass ? (
                <hr role="tournament6"></hr>
              ) : (
                ""
              )}
            </div>
          )}
          {/*  */}
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              width: "100%",
              height: "auto",
            }}
          >
            <Box
              sx={{
                width: "95%",
                maxWidth: { xs: 320, sm: 1200 },
                bgcolor: "background.paper",
                flexGrow: 1,
                marginBottom: 2,
              }}
            >
              <Tabs
                value={activeTab}
                onChange={(_, index) => {
                  setActiveTab(index);
                }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab
                  label="All"
                  onClick={() => {
                    handleClickTab();
                  }}
                  style={{ fontSize: 16, fontWeight: 600 }}
                />
                {(dataCategory || []).map((r, index) => (
                  <Tab
                    key={`${r?.id}`}
                    label={r?.name}
                    onClick={() => {
                      handleClickTab(r?.id);
                    }}
                    style={{ fontSize: 16, fontWeight: 600 }}
                  />
                ))}
              </Tabs>
            </Box>
          </div>

          {/*  */}
          <TabContent
            data={data}
            loading={loading}
            startIndex={0}
            endIndex={8}
            cartClass={cartClass}
            backImage={backImage}
          />
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
