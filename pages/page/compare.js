import React, { useContext } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Row, Table, Media, Col } from "reactstrap";
import { CompareContext } from "../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../helpers/Currency/CurrencyContext";
import CartContext from "../../helpers/cart";

const Compare = () => {
  const contextCompare = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
  const compareItem = contextCompare.compareItems;
  const context = useContext(CartContext);

  const valuePrice = (product) => {
    if (product?.sale) {
      const price = (product?.type?.[0]?.price || 0).replaceAll(",", "");
      const priceOff = price - (price * (product?.sale || 0)) / 100;
      const valuePrice = `${priceOff}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return valuePrice;
    } else {
      return product?.type?.[0]?.price;
    }
  };

  return (
    <CommonLayout parent="home" title="compare">
      <section className="compare-padding">
        <Container>
          <Row>
            <Col sm="12">
              {compareItem.length >= 0 ? (
                <div className="compare-page">
                  <div className="table-wrapper table-responsive">
                    <Table className="table">
                      <thead>
                        <tr className="th-compare">
                          <td>Action</td>
                          {compareItem.map((item, i) => (
                            <th className="item-row" key={i}>
                              <button
                                type="button"
                                className="remove-compare"
                                onClick={() =>
                                  contextCompare.removeFromComapre(item)
                                }
                              >
                                Xóa
                              </button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody id="table-compare">
                        <tr>
                          <th className="product-name">Tên sản phẩm</th>
                          {compareItem.map((item, i) => (
                            <td className="grid-link__title" key={i}>
                              {item?.name}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Hình ảnh</th>
                          {compareItem.map((item, i) => (
                            <td className="item-row" key={i}>
                              <img
                                src={item?.type?.[0]?.image.url}
                                alt=""
                                className="featured-image"
                              />
                              <div className="product-price product_price">
                                <strong>Giá:</strong>
                                <span>
                                  {valuePrice(item)
                                    ? valuePrice(item)
                                    : "Liên hệ"}
                                  {valuePrice(item) ? symbol : null}
                                </span>
                              </div>
                              {/* <input type="hidden" /> */}
                              <button
                                title="Add to Cart"
                                className="add-to-cart btn btn-solid"
                                onClick={() =>
                                  context.addToCart(item, item?.type?.[0])
                                }
                              >
                                Thêm vào giỏ
                              </button>
                              {/* <p className="grid-link__title hidden">
                                {item.name}
                              </p> */}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Mô tả</th>
                          {compareItem.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p className="description-compare">
                                {item.description}
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
                              <strong>Your Cart is Empty</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
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
