import React, { useContext, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Col, Container, Media, Row } from "reactstrap";
import {
  get_campaign,
  get_category,
  get_category_detail,
  get_products,
} from "../../../apis/get";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart/index";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";
import PostLoader from "../PostLoader";
import ProductItem from "../product-box/ProductBox1";
import Slider from "react-slick";
import moment from "moment";

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
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);

  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  const getData = async () => {
    const productsAPI = await get_products();
    const checkProductsStatus = (productsAPI || []).filter((r) => r?.status);
    //
    const categoryAPI = await get_category();
    const checkCategoryStatus = (categoryAPI || []).filter((r) => r?.status);
    setDataCategory(checkCategoryStatus);
    //
    const detailAPI = await get_category_detail();
    //
    const campaignAPI = await get_campaign();
    const mixDataCampaign = (campaignAPI || []).filter((v) => {
      const checkExp = moment().isAfter(
        moment(`${v?.end_day} ${v?.end_hour}`, "DD/MM/YYYY hh:mm")
      );
      return v.status && !checkExp;
    });
    //
    const mixDataProducts = (checkProductsStatus || []).map((item, index) => {
      let findProductCampaign = null;
      let findDetailCampaign = null;
      let findCategoryCampaign = null;

      if (item?.campaign_id) {
        findProductCampaign = (mixDataCampaign || [])?.find(
          (r) => r?.id === item?.campaign_id
        )?.sale;
      } else if (!findProductCampaign) {
        findDetailCampaign = (mixDataCampaign || [])?.find(
          (r) => r?.category_detail_id === item?.category_detail_id
        )?.sale;
      } else if (!findDetailCampaign) {
        console.log("first");
        findCategoryCampaign = (mixDataCampaign || [])?.find(
          (e) => !e?.category_detail_id && e?.category_id === item?.category_id
        )?.sale;
      }

      if (findProductCampaign && findProductCampaign > 0) {
        return {
          ...item,
          sale: findProductCampaign,
        };
      } else if (findDetailCampaign && findDetailCampaign > 0) {
        return {
          ...item,
          sale: findDetailCampaign,
        };
      } else if (findCategoryCampaign && findCategoryCampaign > 0) {
        return {
          ...item,
          sale: findCategoryCampaign,
        };
      } else {
        return item;
      }
    });

    // show data theo yeu cau
    if (type === "product") {
      if (activeTab === "all") {
        setData(mixDataProducts || []);
      } else {
        const dataActive = (mixDataProducts || [])?.filter(
          (r) => r?.category_id === activeTab && r?.status
        );
        setData(dataActive || []);
      }
    } else if (type === "filter") {
      const { type, id, value } = filter;
      if (type === "search" && value !== "") {
        const getFilterSearch = (productsAPI || []).filter(
          (r) =>
            r?.name && (r?.name).toLowerCase().includes(value.toLowerCase())
        );
        setData(getFilterSearch);
      } else {
        const getFilter = (productsAPI || []).filter(
          (r) => r?.[`${type}_id`] === id
        );
        setData(getFilter || []);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [activeTab, type, filter]);

  // console.log(filter, "filter");
  console.log(data, "data");
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

          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab("all")}
              >
                All
              </Tab>
              {(dataCategory || []).map((category, index) => (
                <Tab
                  key={`${category?.id}-${index}`}
                  className={activeTab == type ? "active" : ""}
                  onClick={() => setActiveTab(category?.id)}
                >
                  {category?.name}
                </Tab>
              ))}
            </TabList>

            <TabPanel>
              <TabContent
                data={data}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
              />
            </TabPanel>
            {(dataCategory || []).map((category, index) => (
              <TabPanel key={index}>
                <TabContent
                  data={data}
                  loading={loading}
                  startIndex={0}
                  endIndex={8}
                  cartClass={cartClass}
                  backImage={backImage}
                />
              </TabPanel>
            ))}
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
