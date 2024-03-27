import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
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
          {valuePrice()}
          {symbol}
        </h3>
        <div className="product-description border-product">
          {product.variants ? (
            <div>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media src={sizeChart.src} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
          <span className="instock-cls">{stock}</span>
          <h6 className="product-title">quantity</h6>
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
            onClick={() => context.addToCart(product, quantity)}
          >
            add to cart
          </a>
          <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid">buy now</a>
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">share it</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div>
      </div>
    </>
  );
};

export default DetailsWithPrice;
