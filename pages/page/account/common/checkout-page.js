import React, { useContext, useEffect, useState } from "react";
import { Media, Container, Form, Row, Col } from "reactstrap";
import CartContext from "../../../../helpers/cart";
import paypal from "../../../../public/assets/images/paypal.png";
import { PayPalButton } from "react-paypal-button-v2";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CurrencyContext } from "../../../../helpers/Currency/CurrencyContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setBillDetail,
  setToasterGlobal,
} from "../../../../redux/reducers/common";
import moment from "moment";
import { add_bills } from "../../../../apis/apiServices";
import { getLocal, removeLocal } from "../../../../helpers/Local";

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const lastPrice = cartContext.priceLast;
  const priceSale = cartContext.salePrice;

  const buyNow = getLocal("buyNow");

  const isBuyNow = router?.query?.buyNow;

  const [obj, setObj] = useState({});
  const [payment, setPayment] = useState("cod");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: {} }); // initialise the hook

  const user = useSelector((state) => state?.common?.user);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      Object.keys(user).map((r) => {
        setValue(r, user[r]);
      });
    }
  }, [user]);

  const checkhandle = (value) => {
    setPayment(value);
  };

  const onSubmit = async (data) => {
    if (data !== "") {
      let params = {
        ...data,
        items: isBuyNow ? buyNow : cartItems,
        price_total: isBuyNow ? buyNow?.total : cartTotal,
        price_sale: isBuyNow ? buyNow?.salePrice : priceSale,
        price_last: isBuyNow ? buyNow?.lastPrice : lastPrice,
        is_new: true,
        status: "waiting for progressing",
        create_at: moment().format("DD/MM/YYYY hh:mm"),
      };
      const success = await add_bills(params);
      if (success) {
        dispatch(
          setToasterGlobal({
            active: true,
            mess: `Bạn đã đặt hàng thành công!`,
            status: "success",
          })
        );
        router.push({
          pathname: "/page/order-success",
          state: {
            items: cartItems,
            orderTotal: cartTotal,
            symbol: symbol,
          },
        });
        dispatch(setBillDetail({ ...params, id: success?.id }));
        cartContext.removeAllCart();
      }
    } else {
      errors.showMessages();
    }
  };

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value;
    setObj(obj);
  };

  return (
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Chi tiết hóa đơn</h3>
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Họ</div>
                      <input
                        type="text"
                        className={`${errors.firstName ? "error_border" : ""}`}
                        name="first_name"
                        {...register("first_name", { required: true })}
                        value={user?.first_name || ""}
                      />
                      <span className="error-message">
                        {errors.firstName && "First name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Tên</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        {...register("last_name", { required: true })}
                        value={user?.last_name || ""}
                      />
                      <span className="error-message">
                        {errors.last_name && "Last name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Điện thoại</div>
                      <input
                        type="text"
                        name="phone"
                        className={`${errors.phone ? "error_border" : ""}`}
                        {...register("phone", { pattern: /\d+/ })}
                        value={user?.phone || ""}
                      />
                      <span className="error-message">
                        {errors.phone && "Please enter number for phone."}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email</div>
                      <input
                        //className="form-control"
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        {...register("email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                        value={user?.email || ""}
                        disabled
                      />
                      <span className="error-message">
                        {errors.email && "Please enter proper email address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Địa chỉ</div>
                      <input
                        //className="form-control"
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        name="address"
                        {...register("address", {
                          required: true,
                          min: 20,
                          max: 120,
                        })}
                        placeholder="Street address"
                        value={user?.address || ""}
                      />
                      <span className="error-message">
                        {errors.address && "Please right your address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Thành phố</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        name="city"
                        {...register("city", { required: true })}
                        onChange={setStateFromInput}
                        value={user?.city || ""}
                      />
                      <span className="error-message">
                        {errors.city && "select one city"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Quận / Huyện</div>
                      <input
                        //className="form-control"
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        {...register("state", { required: true })}
                        onChange={setStateFromInput}
                        value={user?.state || ""}
                      />
                      <span className="error-message">
                        {errors.state && "select one state"}
                      </span>
                    </div>
                    {/* <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        //className="form-control"
                        type="text"
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        {...register("pincode", { pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.pincode && "Required integer"}
                      </span>
                    </div> */}
                    {/* <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="checkbox"
                        name="create_account"
                        id="account-option"
                      />
                      &ensp;{" "}
                      <label htmlFor="account-option">Create An Account?</label>
                    </div> */}
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {(cartItems && cartItems.length > 0) || isBuyNow ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Sản phẩm <span>Tổng</span>
                          </div>
                        </div>
                        {isBuyNow ? (
                          <ul className="qty">
                            <li>
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{
                                    wordWrap: "break-word",
                                    width: "56%",
                                    alignItems: "center",
                                  }}
                                >
                                  {buyNow.name} ({buyNow?.typeName}) ×{" "}
                                  {buyNow.qty}
                                </div>
                                <div
                                  style={{
                                    width: "44%",
                                    display: "flex",
                                    paddingLeft: "9%",
                                  }}
                                >
                                  <span>
                                    {buyNow?.total}
                                    {symbol}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          <ul className="qty">
                            {cartItems.map((item, index) => (
                              <li key={index}>
                                <div
                                  style={{
                                    wordWrap: "break-word",
                                    maxWidth: "56%",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.name} ({item?.typeName})
                                </div>
                                (× {item.qty} )
                                <span>
                                  {item?.total}
                                  {symbol}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <ul className="total">
                          <li>
                            Ước tính{" "}
                            <span className="count">
                              {isBuyNow ? `${buyNow?.total}` : `${cartTotal}`}
                              {symbol}
                            </span>
                          </li>
                          <li>
                            Giảm giá{" "}
                            <span className="count">
                              {isBuyNow
                                ? `${buyNow?.salePrice}`
                                : `${priceSale}`}
                              {symbol}
                            </span>
                          </li>
                          <li>
                            Tổng thanh toán{" "}
                            <span className="count">
                              {isBuyNow
                                ? `${buyNow?.priceLast}`
                                : `${lastPrice}`}
                              {symbol}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        {/* <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-2"
                                    defaultChecked={true}
                                    onClick={() => checkhandle("cod")}
                                  />
                                  <label htmlFor="payment-2">COD</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-1"
                                    onClick={() => checkhandle("paypal")}
                                  />
                                  <label htmlFor="payment-1">
                                    PayPal
                                    <span className="image">
                                      <Media src={paypal.src} alt="" />
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div> */}
                        {cartTotal !== 0 ? (
                          <div className="text-end">
                            {payment === "cod" ? (
                              <button type="submit" className="btn-solid btn">
                                Đặt hàng
                              </button>
                            ) : (
                              <PayPalButton
                                amount="0.01"
                                onSuccess={(details, data) => {
                                  alert(
                                    "Transaction completed by " +
                                      details.payer.name.given_name
                                  );

                                  return fetch("/paypal-transaction-complete", {
                                    method: "post",
                                    body: JSON.stringify({
                                      orderID: data.orderID,
                                    }),
                                  });
                                }}
                              />
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CheckoutPage;
