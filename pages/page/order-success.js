import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Col, Media } from "reactstrap";
import one from "../../public/assets/images/pro3/1.jpg";
import CartContext from "../../helpers/cart";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import moment from "moment";

const OrderSuccess = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext.state;
  const cartTotal = cartContext.cartTotal;
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;

  const billDetail = useSelector((state) => state?.common?.billDetail);

  return (
    <CommonLayout parent="trang chủ" title="đặt hàng thành công">
      <section className="section-b-space light-layout white-1">
        <Container>
          <Row>
            <Col md="12">
              <div className="success-text">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h2>Xin cảm ơn</h2>
                <p>Đơn hàng của bạn đã dặt thành công</p>
                <p>ID đơn hàng: {billDetail?.id}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-b-space">
        <Container>
          <Row>
            <Col lg="6">
              <div className="product-order">
                <h3>your order details</h3>

                {(billDetail?.items || []).map((item, i) => (
                  <Row className="product-order-detail" key={i}>
                    <Col xs="3">
                      <Media
                        src={item?.image?.url}
                        alt=""
                        className="img-fluid blur-up lazyload"
                      />
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>Tên</h4>
                        <h5>{item?.name}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>Số lượng</h4>
                        <h5>{item?.qty}</h5>
                      </div>
                    </Col>
                    <Col xs="3" className="order_detail">
                      <div>
                        <h4>giá</h4>
                        <h5>
                          {item?.price}
                          {symbol}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                ))}
                <div className="total-sec">
                  <ul>
                    <li>
                      ước tính{" "}
                      <span>
                        {billDetail?.orderTotal}
                        {symbol}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="final-total">
                  <h3>
                    tổng{" "}
                    <span>
                      {billDetail?.orderTotal}
                      {symbol}
                    </span>
                  </h3>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <Row className="order-success-sec">
                <Col sm="6">
                  <h4>Đơn</h4>
                  <ul className="order-detail">
                    <li>ID đơn hàng: {billDetail?.id}</li>
                    <li>Ngày đặt hàng: {billDetail?.create_at}</li>
                    <li>
                      Tổng hóa đơn: {cartTotal}
                      {symbol}
                    </li>
                  </ul>
                </Col>
                <Col sm="6">
                  <h4>Địa chỉ giao hàng</h4>
                  <ul className="order-detail">
                    <li>
                      {billDetail?.first_name} {billDetail?.last_name}
                    </li>
                    <li>{billDetail?.address}.</li>
                    <li>{billDetail?.state}</li>
                    <li>{billDetail?.city}</li>
                  </ul>
                </Col>
                {/* <Col sm="12" className="payment-mode">
                  <h4>payment method</h4>
                  <p>
                    Pay on Delivery (Cash/Card). Cash on delivery (COD)
                    available. Card/Net banking acceptance subject to device
                    availability.
                  </p>
                </Col> */}
                <Col md="12">
                  <div className="delivery-sec">
                    <h3>Ngày giao hàng dự kiến</h3>
                    <h2>{moment().add(3, "days").format("DD/MM/YYYY")}</h2>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default OrderSuccess;
