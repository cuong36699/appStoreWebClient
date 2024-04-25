import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import { getLocal, setLocal, updateLocal } from "../../../helpers/Local";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const DetailsWithPrice = ({ item, stickyClass, setTab, typeId }) => {
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [active, setActive] = useState(0);

  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const setQuantity = context.setQuantity;
  const cartItems = context.state;

  const uniqueColor = [];
  const uniqueSize = [];
  const keyInfo = product?.infomation
    ? Object.keys(product?.infomation)?.[0]
    : null;

  const theme = useSelector((state) => state?.common?.theme);
  const voucher = useSelector((state) => state?.common?.voucher);
  const hashTagsAPI = useSelector((state) => state?.api?.hashTagsAPI);

  console.log(hashTagsAPI, "zx");

  const changeQty = (e) => {
    if (e > 10) {
      setQuantity(parseInt(10));
    } else if (e < 0) {
      setQuantity(parseInt(1));
    } else if (e > 0 && e <= 10) {
      setQuantity(parseInt(e));
    }
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

  useEffect(() => {
    const index = product?.type?.findIndex((r) => r?.id === typeId);
    if (index != -1) {
      setActive(index);
      setTab(index);
    } else {
      setActive(0);
      setTab(0);
    }
  }, [typeId, product]);

  const handleClick = (type) => {
    router.push({
      pathname: `/product-details/${product?.id}`,
      query: { type },
    });
  };

  const checkAddCard = () => {
    return (cartItems || []).some(
      (r) => r?.typeId === product?.type?.[active]?.id
    );
  };

  const handleBuyNow = () => {
    const type = product?.type?.[active];

    const price = type?.price?.replaceAll(",", "") || 0;
    const priceOff = price - (price * (product?.sale || 0)) / 100;
    const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0;
    const priceTotal = priceOff * quantity;
    const valueTotal = `${priceTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let priceLast = 0;
    let salePrice = 0;

    if (voucher?.length > 0) {
      let sale = 0;
      voucher?.forEach((r) => {
        const check = (priceTotal * (r?.sale || 0)) / 100;
        if (!r?.min_price || r?.min_price == 0) {
          if (r?.max_sale && r?.max_sale != 0) {
            const maxSale = r?.max_sale;
            if (check < maxSale && check > sale) {
              sale = check;
            } else if (maxSale > sale) {
              sale = maxSale;
            }
          } else {
            if (check > sale) {
              sale = check;
            }
          }
        } else {
          const minPrice = r?.min_price?.replaceAll(",", "");
          const checkPrice = priceTotal;
          if (checkPrice >= minPrice) {
            if (r?.max_sale && r?.max_sale != 0) {
              const maxSale = r?.max_sale;
              if (check < maxSale && check > sale) {
                sale = check;
              } else if (maxSale > sale) {
                sale = maxSale;
              }
            } else {
              if (check > sale) {
                sale = check;
              }
            }
          }
        }
      });
      const mixSale = (`${sale}` || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      salePrice = mixSale;
      const lastPrice = priceOff - sale;
      const mixLastPrice = (`${lastPrice}` || 0).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      priceLast = mixLastPrice;
    }

    const param = {
      id: product?.id,
      name: product?.name,
      typeName: type?.name,
      typeId: type?.id,
      image: type?.image,
      price: valuePrice,
      total: valueTotal,
      qty: quantity,
      category: product?.category_id,
      detail: product?.category_detail_id,
      priceLast,
      salePrice,
    };

    setLocal("buyNow", param);
    router.push({
      pathname: "/page/account/checkout",
      query: { buyNow: true },
    });
  };

  const getHashTag = (id) => {
    const data = hashTagsAPI.find((r) => r?.id === id)?.name;
    return data;
  };

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.name} </h2>
        {product.sale ? (
          <h4>
            <del>
              {product?.type?.[active]?.price}
              {symbol}
            </del>
            <span>{product.sale}% off</span>
          </h4>
        ) : null}
        <h3>
          {valuePrice() ? valuePrice() : "Liên hệ"}
          {valuePrice() ? symbol : null}
        </h3>
        {/*  */}
        <div
          className="product-type"
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gap: 10,
            marginBottom: 18,
            width: "100%",
          }}
        >
          {product?.type?.map((r, index) => (
            <div
              key={`${r?.id}-${index}`}
              style={{
                transition: "all 0.3s ease",
                border:
                  active === index ? "1px solid #ff4c3b" : "1px solid gray",
                borderRightWidth: active === index ? 5 : 1,
                padding: 10,
                display: "flex",
                gap: 10,
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleClick(r?.id)}
            >
              <img
                src={r?.image?.url}
                style={{ maxWidth: 40 }}
                loading="lazy"
              />
              <div>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{r?.name}</span>
                <p>{r?.price ? `${r?.price}đ` : "Liên hệ"}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="product-description border-product">
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">
            số lượng {product.unit ? `(${product.unit})` : ""}
          </h6>
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
              <Input
                type="text"
                name="quantity"
                value={quantity}
                onChange={(e) => changeQty(e.target.value)}
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
        <div className="product-buttons button-add-to-card-custom">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, product?.type?.[active])}
            style={{
              background: checkAddCard() ? "#f9f9f9" : "",
            }}
          >
            <p
              style={{
                color: checkAddCard() ? "#000000" : "white",
              }}
            >
              {checkAddCard() ? "đã" : null} thêm vào giỏ hàng
            </p>
          </a>
          <a className="btn btn-solid" onClick={handleBuyNow}>
            mua ngay
          </a>
        </div>
        <div className="border-product">
          <h6 className="product-title">Thông số kỹ thuật</h6>
          {keyInfo ? (
            <div
              className="product-infomation scrollbar"
              style={{
                borderColor: theme ? "#404040" : "#dddddd",
              }}
            >
              {(product?.infomation?.[keyInfo] || [])?.map((cInfo, index) => (
                <div
                  key={`${cInfo?.name}-${index}`}
                  style={{
                    borderTop: index > 0 ? "1px solid gray" : "",
                    marginTop: index > 0 ? 15 : 0,
                    paddingTop: 5,
                    borderColor: theme ? "#404040" : "#dddddd",
                  }}
                >
                  <div
                    style={{
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      {cInfo?.name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 7,
                    }}
                  >
                    {cInfo?.detail?.length > 0
                      ? (cInfo?.detail || [])?.map((detail, i) => (
                          <div
                            key={`${detail?.name}-${i}`}
                            style={{
                              fontSize: 14,
                              width: "100%",
                              fontWeight: 500,
                              display: "flex",
                              gap: 7,
                            }}
                          >
                            <span style={{ width: "45%", textAlign: "start" }}>
                              {detail?.name}
                            </span>
                            <p style={{ width: "55%", textAlign: "start" }}>
                              {detail?.value}
                            </p>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Không có thông tin</div>
          )}
        </div>
        {product?.description ? (
          <div className="border-product">
            <h6 className="product-title">mô tả</h6>
            <div className="product-icon" style={{ wordBreak: "break-word" }}>
              {product?.description}
            </div>
          </div>
        ) : null}

        {/* <div className="border-product">
          <h6 className="product-title">chia sẻ</h6>
          <div className="product-icon">
            <MasterSocial name={product?.name} />
          </div>
        </div> */}
        {product?.hash_tags ? (
          <div className="border-product">
            <h6 className="product-title" style={{ marginBottom: 5 }}>
              Thẻ
            </h6>
            {(product?.hash_tags || []).map((r, index) => (
              <div
                key={index}
                className="product-icon"
                style={{
                  wordBreak: "break-word",
                  backgroundColor: theme ? "#232323" : "#f7f7f7",
                  width: "fit-content",
                  padding: 5,
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                {getHashTag(r)}
              </div>
            ))}
          </div>
        ) : null}
        {product?.sale ? (
          <div className="border-product">
            <h6 className="product-title">Thời gian còn lại</h6>
            <CountdownComponent endDate={product?.end_date} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DetailsWithPrice;
