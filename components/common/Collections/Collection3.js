import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import ProductItems from "../product-box/ProductBox1";
import { useSelector } from "react-redux";
import Paragraph from "../Paragraph";

const TopCollection = ({
  type,
  title,
  subtitle,
  designClass,
  noSlider,
  cartClass,
  productSlider,
  titleClass,
  noTitle,
  innerClass,
  inner,
  backImage,
}) => {
  const context = useContext(CartContext);
  const contextWishlist = useContext(WishlistContext);
  const comapreList = useContext(CompareContext);
  const quantity = context.quantity;

  const [delayProduct, setDelayProduct] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state?.common?.products);
  const statusAPI = useSelector((state) => state?.api?.status);

  useEffect(() => {
    if (statusAPI === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [statusAPI]);

  useEffect(() => {
    if (products) {
      const newData = (products || []).filter((r) => r?.isHot);
      setData(newData || []);
    }
  }, [products]);

  useEffect(() => {
    if (data === undefined) {
      noSlider === false;
    } else {
      noSlider === true;
    }
    setTimeout(() => {
      setDelayProduct(false);
    }, 1);
  }, [delayProduct]);

  const productSliderCustom = {
    ...productSlider,
    infinite: data.length > 4,
  };

  return (
    <>
      <section className={designClass}>
        {data && data.length > 0 ? (
          <Paragraph
            title={"sản phẩm bán chạy"}
            className="title1 section-t-space"
            inner="title-inner1"
            hrClass={false}
          />
        ) : null}
        {noSlider ? (
          <Container>
            <Row>
              <Col>
                {noTitle === "null" ? (
                  ""
                ) : (
                  <div className={innerClass}>
                    {subtitle ? <h4>{subtitle}</h4> : ""}
                    <h2 className={inner}>{title}</h2>
                    {titleClass ? (
                      <hr role="tournament6" />
                    ) : (
                      <div className="line">
                        <span></span>
                      </div>
                    )}
                  </div>
                )}

                {delayProduct ? (
                  <div className="row mx-0 margin-default">
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                  </div>
                ) : (
                  <Slider
                    {...productSliderCustom}
                    className="product-m no-arrow"
                  >
                    {data &&
                      data.map((product, i) => (
                        <div key={i}>
                          <ProductItems
                            product={product}
                            title={title}
                            addWishlist={(type) =>
                              wishListContext.addToWish(product?.id, type)
                            }
                            addCart={(type) => context.addToCart(product, type)}
                            addCompare={() => comapreList.addToCompare(product)}
                            cartClass={cartClass}
                            backImage={backImage}
                          />
                        </div>
                      ))}
                  </Slider>
                )}
              </Col>
            </Row>
          </Container>
        ) : (
          <>
            {title ? (
              <div className="title1 title-gradient  section-t-space">
                <h4>{subtitle}</h4>
                <h2 className="title-inner1">{title}</h2>
                <hr role="tournament6" />
              </div>
            ) : (
              ""
            )}
            <Container>
              <Row className="margin-default">
                {!data || !data?.length === 0 || loading ? (
                  <div className="row margin-default">
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                  </div>
                ) : (
                  data &&
                  data?.slice(0, 8).map((product, index) => (
                    <Col xl="3" sm="6" key={index}>
                      <div>
                        <ProductItems
                          product={product}
                          backImage={backImage}
                          addCompare={() => comapreList.addToCompare(product)}
                          addWishlist={(type) =>
                            wishListContext.addToWish(product?.id, type)
                          }
                          title={title}
                          cartClass={cartClass}
                          addCart={(type) => context.addToCart(product, type)}
                          key={index}
                        />
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </>
        )}
      </section>
    </>
  );
};

export default TopCollection;
