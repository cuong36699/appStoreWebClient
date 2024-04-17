import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Media, Row, Spinner } from "reactstrap";
import PostLoader from "../../../components/common/PostLoader";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import CartContext from "../../../helpers/cart";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import FilterContext from "../../../helpers/filter/FilterContext";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { getLocal, updateLocal } from "../../../helpers/Local";
import { changeBrand } from "../../../redux/reducers/common";
import search from "../../../public/assets/images/icon/search.png";

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  // const [dataRaw, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [limit, setLimit] = useState(8);
  const [grid, setGrid] = useState(colClass);
  const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();
  const [search, setSearch] = useState("");

  const products = useSelector((state) => state?.common?.products);
  const category = useSelector((state) => state?.common?.category);
  const theme = useSelector((state) => state?.common?.theme);

  const filter = getLocal("filter");
  const checkCategory = router?.query?.category;
  const checkDetail = router?.query?.detail;
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const selectedSize = filterContext.selectedSize;

  // useEffect(() => {
  //   const pathname = window.location.pathname;
  //   setUrl(pathname);
  //   router.push(
  //     `${pathname}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`,
  //     undefined,
  //     { shallow: true }
  //   );
  // }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  useEffect(() => {
    const { id, type, tab } = filter;
    setTimeout(() => {
      setActiveTab(tab);
    }, 500);
    if (id === "all") {
      setData(products);
    } else {
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
  }, [products, checkCategory, checkDetail]);

  const handlePagination = () => {};

  const sortData = (sort, data) => {
    setSortBy(sort);
    const dataSort = [...data];
    switch (sort) {
      case "DescOrder":
        dataSort.sort((a, b) => b?.name?.trim().localeCompare(a?.name?.trim()));
        setData([...dataSort]);
        break;
      case "AscOrder":
        dataSort?.sort((a, b) =>
          a?.name?.trim().localeCompare(b?.name?.trim())
        );
        setData([...dataSort]);
        break;

      case "LowToHigh":
        dataSort?.sort((a, b) => {
          const priceA = a?.type?.[0]?.price?.replaceAll(",", "");
          const priceB = b?.type?.[0]?.price?.replaceAll(",", "");
          return priceA - priceB;
        });
        setData([...dataSort]);
        break;

      case "HighToLow":
        dataSort?.sort((a, b) => {
          const priceA = a?.type?.[0]?.price?.replaceAll(",", "");
          const priceB = b?.type?.[0]?.price?.replaceAll(",", "");
          return priceB - priceA;
        });
        setData([...dataSort]);
        break;

      default:
        break;
    }
  };

  // const handleClickTab = (id, name) => {
  //   if (!id) {
  //     sortData(sortBy, products || []);
  //     dispatch(changeBrand({ category: "all", detail: "none" }));
  //   } else {
  //     const dataNew = (products || [])?.filter((r) => r?.category_id === id);
  //     sortData(sortBy, dataNew || []);
  //     dispatch(changeBrand({ category: name, detail: "none" }));
  //   }
  // };

  useEffect(() => {
    if (activeTab === 0) {
      sortData(sortBy, products || []);
      dispatch(changeBrand({ category: "all", detail: "none" }));
    } else {
      const dataNew = (products || [])?.filter(
        (r) => r?.category_id === category?.[activeTab - 1]?.id
      );
      const dataSearch = (dataNew || []).filter(
        (r) => r?.name && (r?.name).toLowerCase().includes(search.toLowerCase())
      );
      // setData(dataSearch);
      sortData(sortBy, dataSearch || []);
      dispatch(
        changeBrand({
          category: category?.[activeTab - 1]?.name,
          detail: "none",
        })
      );
    }
  }, [search, activeTab, products, sortBy]);

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <Row></Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {data && data?.length < limit
                            ? `Có ${data?.length} trên tổng ${data?.length} sản phẩm đang được hiển thị`
                            : "loading"}
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { visibility: "hidden" }
                            : { visibility: "visible" }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 Sản phẩm trên trang</option>
                          <option value="15">15 Sản phẩm trên trang</option>
                          <option value="20">20 Sản phẩm trên trang</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select
                          onChange={(e) => sortData(e.target.value, data)}
                          defaultValue={"none"}
                        >
                          <option
                            value="none"
                            style={{ color: "gray" }}
                            disabled={true}
                          >
                            Sắp xếp theo
                          </option>
                          <option value="LowToHigh">Từ thấp tới cao</option>
                          <option value="HighToLow">Từ cao xuống thấp</option>
                          <option value="Newest">Mới nhất</option>
                          <option value="AscOrder">Theo chữ A-Z</option>
                          <option value="DescOrder">Theo chữ Z-A</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
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
                          // handleClickTab(null);
                          updateLocal("filter", { tab: 0, id: "all" });
                        }}
                        style={{ fontSize: 16, fontWeight: 600 }}
                      />
                      {(category || []).map((r, index) => (
                        <Tab
                          key={`${r?.id}`}
                          label={r?.name}
                          onClick={() => {
                            // handleClickTab(r?.id, r?.name);
                            updateLocal("filter", {
                              tab: index + 1,
                              id: r?.id,
                            });
                          }}
                          style={{ fontSize: 16, fontWeight: 600 }}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </div>
                {/*  */}
                <Row>
                  <Col xs="12">
                    <div className="filter-search">
                      <div
                        className={`header-search-custom ${
                          theme ? "is-theme" : ""
                        }`}
                      >
                        <input
                          className={`input-search ${theme ? "is-theme" : ""}`}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                          placeholder="Bạn cần tìm gì?"
                        />
                      </div>
                      <i
                        className="fa fa-search"
                        style={{ fontSize: 28, fontWeight: "300" }}
                      ></i>
                    </div>
                  </Col>
                </Row>
                {/*  */}
                <Row>
                  {/* Product Box */}
                  {!data || data?.length === 0 || loading ? (
                    data && data?.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                              loading="lazy"
                            />
                            <h3>
                              <strong>Không có sản phẩm được tìm thấy</strong>
                            </h3>
                            <h4>Vui lòng chọn mục khác.</h4>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
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
                    (data || []).map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <ProductItem
                              des={true}
                              product={product}
                              symbol={symbol}
                              cartClass="cart-info cart-wrap"
                              addCompare={() =>
                                compareContext.addToCompare(product)
                              }
                              addWishlist={() =>
                                wishlistContext.addToWish(product)
                              }
                              addCart={() =>
                                cartContext.addToCart(product, quantity)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {data && data.length > limit && (
                        <Button
                          className="load-more"
                          // onClick={() => handlePagination()}
                        >
                          {isLoading && (
                            <Spinner animation="border" variant="light" />
                          )}
                          Xem thêm
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;
