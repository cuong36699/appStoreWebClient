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
import { getLocal, setLocal } from "../../../helpers/Local";
import { useRouter } from "next/router";

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
              addWishlist={(type) =>
                wishListContext.addToWish(product?.id, type)
              }
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
  changeTab,
}) => {
  const context = useContext(CartContext);
  const filter = getLocal("filter");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // const wishListContext = useContext(WishlistContext);
  // const compareContext = useContext(CompareContext);
  // const curContext = useContext(CurrencyContext);
  // const currency = curContext.state;
  // const quantity = context.quantity;
  const checkCategory = router?.query?.category;
  const checkDetail = router?.query?.detail;

  const statusAPI = useSelector((state) => state?.api?.status);
  const products = useSelector((state) => state?.common?.products);
  const category = useSelector((state) => state?.common?.category);

  useEffect(() => {
    if (statusAPI === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [statusAPI]);

  useEffect(() => {
    if (type === "product") {
      setData(products);
    } else if (type === "filter") {
      const { id, type, tab } = filter;
      setTimeout(() => {
        setActiveTab(tab);
      }, 500);
      if (type === "category") {
        const dataNew = (products || [])?.filter((r) => r?.category_id === id);
        setData(dataNew || []);
      } else {
        const dataNew = (products || [])?.filter(
          (r) => r?.category_detail_id === id
        );
        setData(dataNew || []);
      }
    }
  }, [products, type, changeTab, checkCategory, checkDetail]);

  const handleClickTab = (id, activeTab) => {
    if (!id) {
      setData(products || []);
    } else {
      const dataNew = (products || [])?.filter((r) => r?.category_id === id);
      setData(dataNew || []);
    }
    if (type === "filter") {
      setLocal("filter", { ...filter, tab: activeTab });
    }
  };

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
                    handleClickTab(null, 0);
                  }}
                  style={{ fontSize: 16, fontWeight: 600 }}
                />
                {(category || []).map((r, index) => (
                  <Tab
                    key={`${r?.id}`}
                    label={r?.name}
                    onClick={() => {
                      handleClickTab(r?.id, index + 1);
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
