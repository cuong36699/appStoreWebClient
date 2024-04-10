import React, { useState, useContext } from "react";
import Link from "next/link";
import CartContext from "../../../../helpers/cart";
import { Container, Row, Col, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import cart from "../../../../public/assets/images/icon-empty-cart.png";
import { getLocal, setLocal } from "../../../../helpers/Local";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CartPage = () => {
  const router = useRouter();
  const context = useContext(CartContext);
  const cartItems = context.state;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const total = context.cartTotal;
  const removeFromCart = context.removeFromCart;
  const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  const updateQty = context.updateQty;
  const isLogin = getLocal("isLogin");
  const userID = useSelector((state) => state?.common?.userID);

  const handleQtyUpdate = (item, quantity) => {
    if (quantity >= 1) {
      setQuantityError(false);
      updateQty(item, quantity);
    } else {
      setQuantityError(true);
    }
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const minusQty = () => {
    if (quantity > 1) {
      setStock("InStock");
      setQty(quantity - 1);
    }
  };

  const plusQty = (product) => {
    if (product.stock >= quantity) {
      setQty(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  const handleClick = (id, type, category, detail) => {
    setLocal("product", { id, type, category, detail });
    router.push(`/product-details/product`);
  };

  const handleCheckOut = () => {
    if (isLogin && userID) {
      router.push("/page/account/checkout");
    } else {
      router.push("/page/account/login");
    }
  };

  return (
    <div>
      {cartItems && cartItems?.length > 0 ? (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">hình ảnh</th>
                      <th scope="col">tên sản phẩm</th>
                      <th scope="col">giá</th>
                      <th scope="col">số lượng</th>
                      <th scope="col">action</th>
                      <th scope="col">tổng</th>
                    </tr>
                  </thead>
                  {cartItems?.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <a
                              onClick={() =>
                                handleClick(
                                  item?.id,
                                  item?.typeID,
                                  item?.category,
                                  item?.detail
                                )
                              }
                            >
                              <Media
                                style={{ cursor: "pointer" }}
                                src={item?.image ? item?.image?.url : ""}
                                alt=""
                              />
                            </a>
                          </td>
                          <td>
                            <a
                              onClick={() =>
                                handleClick(
                                  item?.id,
                                  item?.typeID,
                                  item?.category,
                                  item?.detail
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {item?.name} ({item?.typeName})
                            </a>
                            <div
                              className="mobile-cart-content row"
                              style={{ gap: 10 }}
                            >
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      name="quantity"
                                      onChange={(e) =>
                                        handleQtyUpdate(item, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue={item.qty}
                                      style={{
                                        borderColor: quantityError && "red",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {item?.price}
                                  {symbol}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => removeFromCart(item)}
                                    ></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td>
                            <h2>
                              {item?.price}
                              {symbol}
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleQtyUpdate(item, e.target.value)
                                  }
                                  className="form-control input-number"
                                  defaultValue={item.qty}
                                  style={{
                                    borderColor: quantityError && "red",
                                  }}
                                />
                              </div>
                            </div>
                            {item.qty >= item.stock ? "out of Stock" : ""}
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => removeFromCart(item)}
                            ></i>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {item.total}
                              {symbol}
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>tổng số tiền:</td>
                      <td>
                        <h4>
                          {total}
                          {symbol}
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td>giảm giá:</td>
                      <td>
                        <h4>
                          {total}
                          {symbol}
                        </h4>
                      </td>
                    </tr>
                    <tr>
                      <td>tổng thanh toán:</td>
                      <td>
                        <h2>
                          {total}
                          {symbol}
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/left_sidebar`}>
                  <a className="btn btn-solid">Tiếp tục mua sắm</a>
                </Link>
              </Col>
              <Col xs="6">
                <a onClick={handleCheckOut} className="btn btn-solid">
                  thanh toán
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={cart}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>Giỏ hàng trống</strong>
                    </h3>
                    <h4>Hãy chọn một sản phẩm.</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default CartPage;
