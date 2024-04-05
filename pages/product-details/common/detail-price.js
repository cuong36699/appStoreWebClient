import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";
import { getLocal, updateLocal } from "../../../helpers/Local";
import { useSelector } from "react-redux";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar, setTab }) => {
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
  const uniqueColor = [];
  const uniqueSize = [];
  const keyInfo = product?.infomation
    ? Object.keys(product?.infomation)?.[0]
    : null;

  const theme = useSelector((state) => state?.common?.theme);

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
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
    const productSelect = getLocal("product");
    const index = product?.type?.findIndex(
      (r) => r?.id === productSelect?.type
    );
    if (index != -1) {
      setActive(index);
      setTab(index);
    } else {
      setActive(0);
      setTab(0);
    }
  }, [product]);

  const handleClick = (index, type) => {
    updateLocal("product", { type });
    setActive(index);
    setTab(index);
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
              onClick={() => handleClick(index, r?.id)}
            >
              <img src={r?.image?.url} style={{ maxWidth: 40 }} />
              <div>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{r?.name}</span>
                <p>{r?.price ? `${r?.price}đ` : "Liên hệ"}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="product-description border-product">
          <span className="instock-cls">{stock}</span>
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
              <Input
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
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, product?.type?.[active])}
          >
            thêm vào giỏ hàng
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
        <div className="border-product">
          <h6 className="product-title">mô tả</h6>
          <div className="product-icon">{product?.description}</div>
        </div>
        <div className="border-product">
          <h6 className="product-title">chia sẻ</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        {product?.sale ? (
          <div className="border-product">
            <h6 className="product-title">Time Reminder</h6>
            <CountdownComponent endDate={product?.end_date} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DetailsWithPrice;
