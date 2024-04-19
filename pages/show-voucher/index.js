import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonLayout from "../../components/shop/common-layout";
import { Col, Container, Media, Row } from "reactstrap";
import Slider from "react-slick";
import { getLocal } from "../../helpers/Local";

const background = "/assets/images/voucher-coupon.jpg";

export default function Voucher() {
  const router = useRouter();
  const id = router.query;
  const voucherLocal = getLocal("voucher");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const voucher = useSelector((state) => state?.common?.voucher);

  useEffect(() => {
    const { id } = voucherLocal;
    const getVoucher = (voucher || []).find((r) => r?.id === id);
    setData(getVoucher);
  }, []);

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
                        <div>
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
                                  >{`${data?.sale}% `}</span>
                                  OFF
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      {/* detail */}
                      <Col lg="6" className="rtl-text">
                        <div className="product-right">
                          <div>
                            <h6 className="product-title">mô tả</h6>
                            <div className="border-product">
                              <p>
                                Giảm giá lên đến
                                {data?.max_sale && data?.max_sale !== 0
                                  ? ` ${data?.max_sale}đ`
                                  : ` ${data?.sale}%`}
                              </p>
                              <p>
                                Áp dụng cho
                                {data?.min_price && data?.min_price !== 0
                                  ? ` đơn hàng từ ${data?.min_price}đ trở lên`
                                  : ` mọi đơn hàng`}
                              </p>
                            </div>
                          </div>
                        </div>
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
