import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { WishlistContext } from "../../../../helpers/wishlist/WishlistContext";
import CartContext from "../../../../helpers/cart/index";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { setLocal } from "../../../../helpers/Local";

const WishlistPage = () => {
  const router = useRouter();
  const context = useContext(WishlistContext);
  const cartContext = useContext(CartContext);

  const wishlist = context.wishlistItems;
  const removeFromWish = context.removeFromWish;
  const addCart = cartContext.addToCart;

  const [data, setData] = useState([]);

  const products = useSelector((state) => state?.common?.products);
  const theme = useSelector((state) => state?.common?.theme);

  useEffect(() => {
    const dataWishList = (wishlist || []).map((r) => {
      const find = products.find((product) => product?.id === r?.id);
      console.log(find, "zzzzzz");
      if (find) {
        const findType = (find?.type || []).find(
          (type) => type?.id === r?.type
        );
        if (findType) {
          const mixPrice = findType?.price?.replaceAll(",", "");
          const newPrice =
            (mixPrice || 0) - ((mixPrice || 0) * (find?.sale || 0)) / 100;
          const valuePrice = `${newPrice}`.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          );
          return {
            name: find?.name,
            id: find?.id,
            type: findType,
            price: valuePrice,
          };
        }
      }
    });
    setData(dataWishList);
  }, [wishlist, products]);

  const checkOut = () => {
    router.push("/page/account/checkout");
  };

  const handleClick = (id, type) => {
    setLocal("product", { id, type });
    router.push(`/product-details/product`);
  };

  return (
    <>
      {data.length >= 0 ? (
        <section className="wishlist-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <Table
                  className="table cart-table table-responsive-xs"
                  style={{ paddingTop: 5 }}
                >
                  <thead>
                    <tr className="table-head">
                      <th scope="col">hình ảnh</th>
                      <th scope="col">tên hàng</th>
                      <th scope="col">loại</th>
                      <th scope="col">giá</th>
                      <th scope="col">availability</th>
                      <th scope="col">action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data || []).map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a href="#">
                            <img
                              src={item?.type?.image?.url}
                              alt=""
                              onClick={() => {
                                handleClick(item?.id, item?.type?.id);
                              }}
                            />
                          </a>
                        </td>
                        <td>
                          <h4
                            onClick={() => {
                              handleClick(item?.id, item?.type?.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {item?.name}
                          </h4>
                          <Row
                            className="mobile-cart-content"
                            style={{ gap: 10 }}
                          >
                            <div className="col-xs-3">
                              <h4>{item?.type?.name}</h4>
                            </div>
                            <div className="col-xs-3">
                              <p style={{ marginTop: -5 }}>
                                {item?.stock > 0 ? "In Stock" : "out of Stock"}
                              </p>
                            </div>
                            <div className="col-xs-3">
                              <h2 className="td-color">{item?.price}đ</h2>
                            </div>
                            <div className="col-xs-3">
                              <h2 className="td-color">
                                <a href="#" className="icon me-1">
                                  <i className="fa fa-close"></i>
                                </a>
                                <a href="#" className="cart">
                                  <i className="fa fa-shopping-cart"></i>
                                </a>
                              </h2>
                            </div>
                          </Row>
                        </td>
                        <td>
                          <h4>{item?.type?.name}</h4>
                        </td>
                        <td>
                          <h4>{item?.price}đ</h4>
                        </td>
                        <td>
                          <p>{item?.stock > 0 ? "In Stock" : "out of Stock"}</p>
                        </td>
                        <td>
                          <a
                            href={null}
                            className="icon me-3"
                            onClick={() =>
                              removeFromWish(item?.id, item?.type?.id)
                            }
                          >
                            <i
                              className="fa fa-times"
                              style={{ color: theme ? "#f8f8f8" : "" }}
                            ></i>
                          </a>
                          <a
                            href={null}
                            className="cart"
                            onClick={() => addCart(item)}
                          >
                            <i
                              className="fa fa-shopping-cart"
                              style={{ color: theme ? "#f8f8f8" : "" }}
                            ></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="wishlist-buttons">
              <Col sm="12">
                <Link href={"/"}>
                  <a href={null} className="btn btn-solid">
                    continue shopping
                  </a>
                </Link>
                <a href={null} className="btn btn-solid" onClick={checkOut}>
                  check out
                </a>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default WishlistPage;
