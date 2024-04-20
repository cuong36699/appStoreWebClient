import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Table, Media, Col } from "reactstrap";
import { CompareContext } from "../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import CartContext from "../../helpers/cart";
import { useSelector } from "react-redux";

const Compare = () => {
  const contextCompare = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const compareItem = contextCompare.compareItems;
  const context = useContext(CartContext);

  return (
    <CommonLayout parent="trang chủ" title="so sánh">
      <section className="compare-padding">
        <Container>
          <Row>
            <Col sm="12">
              {compareItem.length > 0 ? (
                <div className="compare-page">
                  <div className="table-wrapper table-responsive">
                    <Table className="table">
                      <thead>
                        <tr className="th-compare">
                          <td>Action</td>
                          {compareItem.map((item, i) => (
                            <th className="item-row" key={i}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  type="button"
                                  className="remove-compare"
                                  onClick={() =>
                                    contextCompare.removeFromComapre(item)
                                  }
                                  style={{ color: "red" }}
                                >
                                  Xóa
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody id="table-compare">
                        <tr>
                          <th className="product-name">Tên sản phẩm</th>
                          {compareItem.map((item, i) => (
                            <td className="grid-link__title" key={i}>
                              <div style={{ textAlign: "center" }}>
                                {item?.name} ({item?.typeName})
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Hình ảnh</th>
                          {compareItem.map((item, i) => (
                            <td className="item-row" key={i}>
                              <div
                                style={{
                                  display: "flex",
                                  // justifyContent: "center",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  gap: 20,
                                }}
                              >
                                <img
                                  src={item?.image.url}
                                  alt=""
                                  className="featured-image"
                                  style={{ maxHeight: 328, maxWidth: 185 }}
                                />
                                <button
                                  title="Add to Cart"
                                  className="add-to-cart btn btn-solid"
                                  onClick={() =>
                                    context.addToCart(item, item?.type)
                                  }
                                  // style={{ width: "20%" }}
                                >
                                  Thêm vào giỏ
                                </button>
                              </div>

                              {/* <input type="hidden" /> */}

                              {/* <p className="grid-link__title hidden">
                                {item.name}
                              </p> */}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Giá</th>
                          {compareItem.map((item, i) => (
                            <td className="grid-link__title" key={i}>
                              <div style={{ textAlign: "center" }}>
                                <span>
                                  {item?.price && item?.price != 0
                                    ? item?.price
                                    : "Liên hệ"}
                                  {item?.price && item?.price != 0
                                    ? symbol
                                    : null}
                                </span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Mô tả</th>
                          {compareItem.map((item, i) => (
                            <td
                              className="item-row"
                              key={i}
                              style={{ width: "30%" }}
                            >
                              <p
                                className="description-compare"
                                style={{ wordBreak: "break-word" }}
                              >
                                {item?.description}
                              </p>
                            </td>
                          ))}
                        </tr>
                        {/* <tr>
                            <th className="product-name">Khả dụng</th>
                            {compareItem.map((item, i) => (
                                <td className="available-stock" key={i}>
                                <p>
                                    {item.stock >= 0
                                    ? "Not Available"
                                    : "Available"}
                                </p>
                                </td>
                            ))}
                            </tr> */}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                <section className="cart-section section-b-space">
                  <Container>
                    <Row>
                      <Col sm="12">
                        <div>
                          <Col sm="12" className="empty-cart-cls text-center">
                            <Media
                              src={`/assets/images/icon-empty-cart.png`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Bạn chưa chọn phẩm để so sánh</strong>
                            </h3>
                            <h4>Hãy thêm sản phẩm vào danh sách dể so sánh.</h4>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Compare;
