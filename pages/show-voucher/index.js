import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonLayout from "../../components/shop/common-layout";
import { Col, Container, Media, Row } from "reactstrap";
import Slider from "react-slick";

const background = "/assets/images/voucher-coupon.jpg";

export default function Voucher() {
  const router = useRouter();
  const id = router.query;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const voucher = useSelector((state) => state?.common?.voucher);

  console.log(voucher, "voucher");

  var productSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  var productsnav = {
    slidesToShow: 4,
    infinite: data?.type?.[activeTab]?.imagesList?.length > 4,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    speed: 300,
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [data]);

  console.log(activeTab, "zzzzz");

  return (
    <CommonLayout parent="Trang chủ" title="Phiếu giảm giá">
      <section className="">
        <div className="collection-wrapper">
          <Container>
            <Col lg="12" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col xl="12" className="filter-col"></Col>
                </Row>
                {!voucher || voucher.length === 0 || loading ? (
                  "loading"
                ) : (
                  <div>
                    <Row>
                      <Col lg="6">
                        <Slider
                          {...productSlider}
                          asNavFor={nav2}
                          ref={(slider) => (slider1.current = slider)}
                          className="product-slick"
                        >
                          {(voucher || [])?.map((vari, index) => (
                            <div key={`${vari?.id}-${index}`}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <div
                                  // className="img-fluid image_zoom_cls-0"
                                  style={{
                                    width: 710,
                                    height: 260,
                                    backgroundImage: `url(${background})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    padding: 24,
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      fontWeight: "400",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 66,
                                          fontWeight: "800",
                                        }}
                                      >
                                        Gift
                                      </p>
                                      <p
                                        style={{
                                          fontSize: 32,
                                          fontWeight: "600",
                                        }}
                                      >
                                        Voucher
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        color: "#ff4c3b",
                                        fontWeight: "800",
                                        fontSize: 24,
                                        textAlign: "right",
                                        width: "100%",
                                        paddingRight: 40,
                                      }}
                                    >
                                      <span
                                        style={{ fontSize: 64 }}
                                      >{`${vari?.sale}% `}</span>
                                      OFF
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </Col>
                      {/* detail */}
                      <Col lg="6" className="rtl-text">
                        <div className="product-right">
                          <div>
                            <h6 className="product-title">mô tả</h6>
                            <div className="border-product">
                              <p>
                                Giảm giá lên đến
                                {voucher?.[activeTab]?.max_sale &&
                                voucher?.[activeTab]?.max_sale !== 0
                                  ? ` ${voucher?.[activeTab]?.max_sale}đ`
                                  : ` ${voucher?.[activeTab]?.sale}%`}
                              </p>
                              <p>
                                Áp dụng cho
                                {voucher?.[activeTab]?.min_price &&
                                voucher?.[activeTab]?.min_price !== 0
                                  ? ` đơn hàng từ ${voucher?.[activeTab]?.min_price}đ trở lên`
                                  : ` mọi đơn hàng`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {/*  */}
                      <Col
                        lg="12"
                        style={
                          {
                            // maxWidth: "calc(100% - 6px)",
                            // transform: "scale(0.5,0.5)",
                          }
                        }
                      >
                        <Slider
                          className="slider-nav"
                          {...productsnav}
                          asNavFor={nav1}
                          ref={(slider) => (slider2.current = slider)}
                        >
                          {voucher
                            ? (voucher || [])?.map((vari, index) => (
                                <div key={`${vari?.id}-${index}`}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                    onClick={() => {
                                      setActiveTab(index);
                                    }}
                                  >
                                    <div
                                      // className="img-fluid image_zoom_cls-0"
                                      style={{
                                        width: "calc(710px /2)",
                                        height: "calc(260px /2)",
                                        backgroundImage: `url(${background})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        padding: 24,
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          fontWeight: "400",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "flex-end",
                                            height: "60%",
                                          }}
                                        >
                                          <p>
                                            <span
                                              style={{
                                                fontSize: 33,
                                                fontWeight: "800",
                                              }}
                                            >
                                              Gift
                                            </span>
                                            <p
                                              style={{
                                                fontSize: 16,
                                                fontWeight: "600",
                                              }}
                                            >
                                              Voucher
                                            </p>
                                          </p>
                                        </div>
                                        <div
                                          style={{
                                            color: "#ff4c3b",
                                            fontWeight: "800",
                                            fontSize: 12,
                                            textAlign: "right",
                                            width: "100%",
                                          }}
                                        >
                                          <span
                                            style={{ fontSize: 32 }}
                                          >{`${vari?.sale}% `}</span>
                                          OFF
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : null}
                        </Slider>
                      </Col>
                    </Row>
                  </div>
                )}
              </Container>
            </Col>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
}
