import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CommonLayout from "../../components/shop/common-layout";
import { Col, Container, Media, Row } from "reactstrap";
import Slider from "react-slick";

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

  var productSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };

  var productsnav = {
    slidesToShow: 3,
    infinite: data?.type?.[activeTab]?.imagesList?.length > 3,
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

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  return (
    <CommonLayout parent="Trang chủ" title="Phiếu giảm giá">
      <section className="">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <Col lg="9" sm="12" xs="12">
                <Container fluid={true}>
                  <Row>
                    <Col xl="12" className="filter-col">
                      <div className="filter-main-btn mb-2">
                        <span onClick={filterClick} className="filter-btn">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                  {!voucher || voucher.length === 0 || loading ? (
                    "loading"
                  ) : (
                    <div>
                      <Row>
                        <Col lg="6" className="product-thumbnail">
                          <Slider
                            {...productSlider}
                            asNavFor={nav2}
                            ref={(slider) => (slider1.current = slider)}
                            className="product-slick"
                          >
                            {(voucher || [])?.map((vari, index) => (
                              <div key={`${vari?.id}-${index}`}>
                                <div className="img-fluid image_zoom_cls-0">
                                  123
                                </div>
                              </div>
                            ))}
                          </Slider>
                        </Col>
                        <Col lg="6" className="rtl-text">
                          {/* <DetailsWithPrice
                            item={data}
                            setTab={(i) => {
                              setActiveTab(i);
                            }}
                          /> */}
                        </Col>
                      </Row>
                      <Row>
                        {/*  */}
                        <div
                          style={{
                            maxWidth: "calc(100% - 6px)",
                          }}
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
                                    <div className="img-fluid"></div>
                                  </div>
                                ))
                              : null}
                          </Slider>
                        </div>
                      </Row>
                    </div>
                  )}
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
}
