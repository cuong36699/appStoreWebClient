import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Col, Media, Modal, ModalBody, Row } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import MasterProductDetail from "./MasterProductDetail";
import { setLocal } from "../../../helpers/Local";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";

const ProductItem = ({
  product,
  addCart,
  backImage,
  des,
  addWishlist,
  cartClass,
  productDetail,
  addCompare,
  title,
}) => {
  // eslint-disable-next-line
  // 400 x 296
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const plusQty = cartContext.plusQty;
  const minusQty = cartContext.minusQty;
  const quantity = cartContext.quantity;
  const setQuantity = cartContext.setQuantity;
  const cartItems = cartContext.state;
  const context = useContext(WishlistContext);
  const wishlist = context.wishlistItems;

  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const [active, setActive] = useState(0);

  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = () => {
    setLocal("product", {
      id: product?.id,
      type: product?.type?.[active]?.id,
      category: product?.category_id,
      detail: product?.category_detail_id,
    });
    router.push(`/product-details/product`);
  };

  const changeByType = (item, index) => {
    setActive(index);
    setImage(item?.image?.url);
  };

  const valuePrice = () => {
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
    <div className="product-box product-wrap" style={{ maxWidth: 240 }}>
      <div className="img-wrapper">
        <div className="lable-block">
          {/* {product.new === true ? <span className="lable3">new</span> : ""} */}
          {product?.sale ? (
            <span className="lable4" style={{ color: "#ff4c3b" }}>
              on sale
            </span>
          ) : (
            ""
          )}
        </div>
        {/* image */}
        <div
          className="front"
          onClick={clickProductDetail}
          style={{
            width: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "flex-end",
          }}
        >
          <img
            src={`${image ? image : product?.type?.[0]?.image?.url}`}
            className="img-fluid m-auto"
            alt=""
          />
        </div>
        {/*  */}
        {backImage ? (
          product?.type?.[0]?.image?.url === "undefined" ? (
            "false"
          ) : (
            <div
              className="back"
              onClick={clickProductDetail}
              style={{
                width: "100%",
                display: "flex",
                justifyItems: "center",
                alignItems: "flex-end",
                height: 300,
                cursor: "pointer",
              }}
            >
              <img
                src={`${image ? image : product?.type?.[0]?.image?.url}`}
                className="img-fluid m-auto"
                alt=""
              />
            </div>
          )
        ) : (
          ""
        )}

        <div
          className={cartClass}
          style={{
            backgroundColor: "#00000090",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <button
            title="Add to cart"
            onClick={() => addCart(product?.type?.[active])}
          >
            <i
              className="fa fa-shopping-cart"
              aria-hidden="true"
              style={{
                color: (cartItems || []).some(
                  (r) =>
                    r?.id === product?.id &&
                    r?.typeId === product?.type?.[active]?.id
                )
                  ? "#ff4c3b"
                  : "",
              }}
            ></i>
          </button>
          <a
            href={null}
            title="Add to Wishlist"
            onClick={() => addWishlist(product?.type?.[active]?.id)}
          >
            <i
              className="fa fa-heart"
              aria-hidden="true"
              style={{
                color: (wishlist || []).some(
                  (r) =>
                    r?.id === product?.id &&
                    r?.type === product?.type?.[active]?.id
                )
                  ? "#ff4c3b"
                  : "",
              }}
            ></i>
          </a>
          <a href={null} title="Quick View" onClick={toggle}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href={null} title="Compare" onClick={toggleCompare}>
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
          <Modal
            isOpen={modalCompare}
            toggle={toggleCompare}
            size="lg"
            centered
          >
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product?.type && image
                          ? image
                          : product?.type?.[0]?.image?.url
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item{" "}
                        <span>{product.title} </span>
                        <span> successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <a
                            href={null}
                            className="btn-sm btn-solid"
                            onClick={addCompare}
                          >
                            View Compare list
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      </div>
      {/*  */}
      <MasterProductDetail
        product={product}
        productDetail={productDetail}
        currency={currency}
        uniqueTags={uniqueTags}
        title={title}
        des={des}
        changeByType={changeByType}
      />
      {/*  */}
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
                  src={`${
                    product?.type && image
                      ? image
                      : product?.type?.[0]?.image?.url
                  }`}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg="6" className="rtl-text">
              <div className="product-right">
                <h2> {product?.name} </h2>
                <h3>
                  {valuePrice() ? valuePrice() : "Liên hệ"}
                  {valuePrice() ? currency.symbol : null}
                </h3>
                <div className="border-product">
                  <h6 className="product-title">Mô tả</h6>
                  <p>{product.description}</p>
                </div>
                <div className="product-description border-product">
                  <h6 className="product-title">só lượng</h6>
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
                          onClick={() => plusQty(product)}
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
                    onClick={() => addCart(product?.type?.[active])}
                  >
                    thêm vào giỏ
                  </button>
                  <button
                    className="btn btn-solid"
                    onClick={clickProductDetail}
                  >
                    xem chi tiết
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProductItem;
