import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Media, Modal, ModalBody } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getLocal, setLocal } from "../../../helpers/Local";

const ProductSection = () => {
  const router = useRouter();
  const curContext = useContext(CurrencyContext);
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const symbol = curContext.state.symbol;
  const currency = curContext.state;
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;
  const plusQty = cartCtx.plusQty;
  const minusQty = cartCtx.minusQty;
  const setQuantity = cartCtx.setQuantity;
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const [previewProduct, setPreviewProduct] = useState();
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const products = useSelector((state) => state?.common?.products);

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const getData = () => {
    const productSelect = getLocal("product");
    setLoading(true);
    const newData = (products || [])?.filter(
      (r) =>
        r?.category_id === productSelect?.category &&
        r?.id !== productSelect?.id
    );
    setData(newData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [products]);

  const clickProductDetail = (product) => {
    const type = product?.type?.[active]?.id;
    setLocal("product", {
      id: product?.id,
      type,
      category: product?.category_id,
      detail: product?.category_detail_id,
    });
    router.push(`/product-details/product`, undefined, { shallow: true });
    getData();
  };

  const getPreviewProduct = (item) => {
    setPreviewProduct(item);
    toggle();
  };

  const valuePrice = (product) => {
    if (product?.sale) {
      const price = product?.type?.[active]?.price.replaceAll(",", "");
      const priceOff = price - (price * (product?.sale || 0)) / 100;
      const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return valuePrice;
    } else {
      return product?.type?.[active]?.price;
    }
  };

  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>sản phẩm liên quan</h2>
          </Col>
        </Row>
        <Row className="search-product">
          {!data || data?.length === 0 || loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data?.slice(0, 6).map((product, index) => (
                  <Col xl="2" md="4" sm="6" key={index}>
                    <div className="product-box">
                      <div className="img-wrapper">
                        <div className="front">
                          <a href="#">
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={product.type?.[0]?.image?.url}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="back">
                          <a href="#">
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={product.type?.[0]?.image?.url}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        {/*  */}
                        <div
                          className="cart-info cart-wrap"
                          style={{
                            height: "100%",
                            backgroundColor: "#00000090",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            data-toggle="modal"
                            data-target="#addtocart"
                            title="Add to cart"
                            onClick={() => addToCart(product, quantity)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                          <a
                            href={null}
                            onClick={() =>
                              wishlistContext.addToWish(
                                product,
                                product?.type?.[active]?.id
                              )
                            }
                            title="Add to Wishlist"
                          >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </a>
                          <a
                            href={null}
                            onClick={() => getPreviewProduct(product)}
                            data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                          >
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </a>
                          <a
                            href={null}
                            onClick={() => compareContext.addToCompare(product)}
                            title="Compare"
                          >
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <a href={null}>
                          <h6>{product.name}</h6>
                        </a>
                        <h4>
                          {valuePrice(product)}
                          {symbol}
                        </h4>
                        {/* <ul
                          // className="color-variant"
                          style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                          {product?.type ? (
                            <ul style={{ display: "flex", gap: 5 }}>
                              {(product?.type || [])?.map((item, i) => (
                                <li key={i}>
                                  <Media
                                    src={`${item?.image?.url}`}
                                    alt="wishlist"
                                    onClick={() => {
                                      setActive(i);
                                      if (item?.image?.url) {
                                        changeByType(item, i);
                                      }
                                    }}
                                    style={{
                                      maxWidth: 40,
                                      objectFit: "cover",
                                      minHeight: 40,
                                      maxHeight: 80,
                                      opacity: active === i ? 1 : 0.5,
                                      cursor: "pointer",
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </ul> */}
                      </div>
                    </div>
                  </Col>
                ))}
            </>
          )}
        </Row>
        {previewProduct ? (
          <Modal
            isOpen={modal}
            toggle={toggle}
            className="modal-lg quickview-modal"
            centered
          >
            <ModalBody>
              <Row>
                <Col lg="6" xs="12">
                  <div className="quick-view-img">
                    <Media
                      src={`${previewProduct.type?.[0]?.image?.url}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col lg="6" className="rtl-text">
                  <div className="product-right">
                    <h2> {previewProduct.name} </h2>
                    <h3>
                      {valuePrice(previewProduct)}
                      {currency.symbol}
                    </h3>
                    <div className="border-product">
                      <h6 className="product-title">thông tin sản phẩm</h6>
                      <p>{previewProduct.description}</p>
                    </div>
                    <div className="product-description border-product">
                      <h6 className="product-title">số lượng</h6>
                      <div className="qty-box">
                        <div className="input-group">
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-left-minus"
                              onClick={minusQty}
                              data-type="minus"
                              data-field=""
                            >
                              <i className="fa fa-angle-left"></i>
                            </button>
                          </span>
                          <input
                            type="text"
                            name="quantity"
                            value={quantity}
                            onChange={changeQty}
                            className="form-control input-number"
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-right-plus"
                              onClick={() => plusQty(previewProduct)}
                              data-type="plus"
                              data-field=""
                            >
                              <i className="fa fa-angle-right"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="product-buttons">
                      <button
                        className="btn btn-solid"
                        onClick={() => addToCart(previewProduct, quantity)}
                      >
                        thêm vào giỏ
                      </button>
                      <button
                        className="btn btn-solid"
                        onClick={() => clickProductDetail(previewProduct)}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        ) : (
          ""
        )}
      </Container>
    </section>
  );
};

export default ProductSection;
